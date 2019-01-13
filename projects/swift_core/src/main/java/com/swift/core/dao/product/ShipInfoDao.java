package com.swift.core.dao.product;

import com.swift.core.domain.product.ShipInfoDO;
import org.apache.ibatis.annotations.Mapper;

/**
 * Created by gaoshan on 25/11/18.
 */
@Mapper
public interface ShipInfoDao {

    ShipInfoDO get(String orderId);

    ShipInfoDO getEmail();

    int updateIsEmail(int id);
}
