package com.swift.core.dao.product;

import com.swift.core.domain.product.ProductDO;
import com.swift.core.domain.product.ProductImageDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 28/10/18.
 */

@Mapper
public interface ProductDao {

    ProductDO get(Long productId);

    List<ProductDO> list(Map<String, Object> map);

    int count(Map<String, Object> map);

    int save(ProductDO product);

    int update(ProductDO product);

    int remove(Long productId);

    int saveAdditionalPics(List<ProductImageDO> list);
}
