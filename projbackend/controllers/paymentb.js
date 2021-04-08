const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "592rj3t8q42hx9v7",
  publicKey: "fdb6cd7yjdcvp8yw",
  privateKey: "472a03e3784019c92c4cfc7865d4742f"
});



exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function(err,response){
        if(err){
            res.status(500).send(err)
        }
        else{
            res.send(response);
        }
    }
    )
}

exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result);
          }
      });
}

