package com.swift.core.dao.product;

import com.swift.core.domain.product.OrderDO;
import com.swift.core.domain.product.OrderInfoDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 28/10/18.
 */
@Mapper
public interface OrderDao {

    OrderDO get(String orderId);

    List<OrderDO> list(Map<String, Object> map);

    int count(Map<String, Object> map);

    int save(OrderDO order);

    int update(OrderDO order);

    OrderDO orderDetail(String orderId);

    List<OrderInfoDO> orderInfos(String orderId);
}
