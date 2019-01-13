package com.swift.core.dao.product;

import com.swift.core.domain.product.ShippingAreaDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 10/11/18.
 */
@Mapper
public interface ShippingAreaDao {

    ShippingAreaDO get(Long areaId);

    List<ShippingAreaDO> list(Map<String, Object> map);

    int count(Map<String, Object> map);

    int save(ShippingAreaDO shippingArea);

    int update(ShippingAreaDO shippingArea);

    int remove(Long areaId);
}
