package com.incubateur.codrive.controller;

import com.incubateur.codrive.model.PaymentRequest;
import com.incubateur.codrive.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService service;


    @PostMapping("card")
    public ResponseEntity<String> completePayment(@RequestBody PaymentRequest request) throws StripeException, StripeException {
        String chargeId= service.charge(request);
        return chargeId!=null? new ResponseEntity<String>(chargeId, HttpStatus.OK):
                new ResponseEntity<String>("Please check the credit card details entered",HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public String handleError(StripeException ex) {
        return ex.getMessage();
    }
}
