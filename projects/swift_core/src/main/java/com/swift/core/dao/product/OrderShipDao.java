package com.swift.core.dao.product;

import com.swift.core.domain.product.OrderShipDO;
import org.apache.ibatis.annotations.Mapper;

/**
 * Created by gaoshan on 25/11/18.
 */
@Mapper
public interface OrderShipDao {

    OrderShipDO get(String orderId);

}
