import express from "express";
import db from "@paytm/database/client"
const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    try {
        await db.$transaction(
            [
                db.balance.update({
                    where:{
                        userId: paymentInformation.userId
                    },
                    data: {
                        amount: {
                            increment: paymentInformation.amount
                        }
                    }
                }),
                db.onRampTransaction.update({
                    where:{
                        token: paymentInformation.token
                    },
                    data:{
                        status: "Success"
                    }
                }),
            ]
        ) 
        res.status(200).json({
            message: "captured"
        })
    } catch (e) {
        res.status(400).json({
            message: "transaction failed"
        })
    }
})

app.listen(3003, () => {
    console.log('Webhook server started at port 3003')
})