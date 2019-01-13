package com.swift.core.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

public class EmailUtil {

    private static final Logger logger = LoggerFactory
            .getLogger(EmailUtil.class);

    private static final String[] avalivleMails;
    private static final JavaMailSenderImpl mailSender;
    private static final Random random;
    private static final Properties mailProperty;

    private EmailUtil() {
    }

    static {
        avalivleMails = new String[]{"info@vtag.co.nz"};
        mailSender = new JavaMailSenderImpl();
        mailSender.setHost("webcloud85.au.syrahost.com");
        mailProperty = new Properties();
        mailProperty.put("mail.smtp.auth", true);

        //port 465 configuration
        mailProperty.put("mail.smtp.timeout", 25000);
        mailProperty.put("mail.smtp.ssl.enable", "true");
        mailProperty.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        mailProperty.put("mail.smtp.port", "465");
        mailProperty.put("mail.smtp.socketFactory.port", "465");

        //port 587 configuration
//        mailProperty.put("mail.smtp.port", "587");
//        mailProperty.put("mail.smtp.starttls.enable", "true");


        mailSender.setJavaMailProperties(mailProperty);
        mailSender.setPassword("P@ssword");
        random = new Random();
    }

    public static boolean sendEmail(String toEmail, String title, String content) {
        String mailUser = avalivleMails[random.nextInt(avalivleMails.length)];
        mailSender.setUsername(mailUser);
        long beginTime = System.currentTimeMillis();
        SimpleMailMessage mail = new SimpleMailMessage();
        try {
            mail.setTo(toEmail);
            mail.setFrom(mailUser);
            mail.setSubject(title);
            mail.setText(content);
            mailSender.send(mail);
        } catch (MailException e) {
            logger.error("返送邮件失败", e);
            return false;
        } finally {
            long endTime = System.currentTimeMillis();
        }
        return true;
    }

    public static boolean sendHtmlEmail(String toEmail, String title, String content) {
        String mailUser = avalivleMails[random.nextInt(avalivleMails.length)];
        MySendMailAuthenticator mySendMailAuthenticator = new MySendMailAuthenticator(mailUser,"P@ssword");
        Session session = Session.getInstance(mailProperty,mySendMailAuthenticator);
        long beginTime = System.currentTimeMillis();
        logger.info("Sending email to "+toEmail+": starts at "+beginTime);
        try {
            mailSender.setSession(session); // 为发送器指定会话
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail);
            helper.setTo(toEmail); // 发送给谁
            helper.setSubject(title); // 标题
            helper.setFrom(mailUser); // 来自
            // 邮件内容，第二个参数指定发送的是HTML格式
            helper.setText(content,true);
            mailSender.send(mail); // 发送
        }catch (Exception e) {
            logger.error("发送邮件失败", e);
            return false;
        } finally {
            long endTime = System.currentTimeMillis();
            logger.info("Sending email to "+toEmail+": ends at "+endTime);
        }
        return true;
    }


    static class MySendMailAuthenticator extends Authenticator {
        String username="";
        String password="";
        public MySendMailAuthenticator(String user,String pass){
            this.username=user;
            this.password=pass;
        }
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username,password);
        }
    }

    public static void main(String[] args){
        sendHtmlEmail("gaoshan070@gmail.com","test","test");
    }
}

