//package com.swift.manage.task;
//
//import com.swift.core.common.utils.EmailUtil;
//import com.swift.core.common.utils.NumberUtil;
//import com.swift.core.domain.product.OrderDO;
//import com.swift.core.domain.product.OrderInfoDO;
//import com.swift.core.domain.product.OrderShipDO;
//import com.swift.core.domain.product.ShipInfoDO;
//import org.quartz.JobExecutionContext;
//import org.quartz.JobExecutionException;
//import org.quartz.StatefulJob;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.thymeleaf.context.Context;
//import org.thymeleaf.spring5.SpringTemplateEngine;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//@Component
//public class SendEmailJob implements StatefulJob {
//
//    @Autowired
//    private SpringTemplateEngine templateEngine;
//
//    @Autowired
//    private ShipInfoService shipInfoService;
//
//    @Autowired
//    private OrderService orderService;
//
//    @Autowired
//    private OrderShipService orderShipService;
//
//    @Override
//    public void execute(JobExecutionContext context) throws JobExecutionException {
//        ShipInfoDO shipInfoDO = shipInfoService.getEmail();
//        if(shipInfoDO != null) {
//            if (StringUtils.isNotEmpty(shipInfoDO.getEmail())) {
//                boolean result = sendEmail(shipInfoDO.getEmail(),shipInfoDO.getOrderId());
//                if (result) {
//                    shipInfoService.updateIsEmail(shipInfoDO.getId());
//                }
//            }
//        }
//    }
//
//    public boolean sendEmail(String toEmail, String oid) {
//        Context context = new Context();
//        if(StringUtils.isEmpty(oid)){
//            return false;
//        }else{
//            OrderDO order = orderService.get(oid);
//            if(order == null){
//                return false;
//            }
//            ShipInfoDO shipInfo = shipInfoService.get(oid);
//            OrderShipDO orderShip = orderShipService.get(oid);
//            List<OrderInfoDO> infos = orderService.orderInfos(oid);
//            float subtotalWithTax = Float.valueOf(order.getAmount());
//            float subtotal = NumberUtil.divide(new BigDecimal(subtotalWithTax), new BigDecimal(1.15f));
//            float tax = subtotalWithTax - subtotal;
//
//            context.setVariable("billingInfo", shipInfo);
//            context.setVariable("order", order);
//            context.setVariable("shippingInfo", orderShip);
//            context.setVariable("detailList", infos);
//            context.setVariable("tax", tax);
//            context.setVariable("subtotal", subtotal);
//            String text = templateEngine.process("mail-template", context);
//            return EmailUtil.sendHtmlEmail(toEmail, "Your order from VTag", text);
//        }
//    }
//}
