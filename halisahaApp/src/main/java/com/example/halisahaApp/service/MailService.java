package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.MailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    public void sendMail(MailDto sentMail) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(sentMail.getTo());
        mail.setSubject(sentMail.getSubject());
        mail.setText(sentMail.getText());
        mailSender.send(mail);
    }
}
