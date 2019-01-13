package com.swift.core.dao.product;

import com.swift.core.domain.product.CategoryDO;
import com.swift.core.domain.product.ProductAmountDO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 28/10/18.
 */

@Mapper
public interface CategoryDao {

    CategoryDO get(Long categoryId);

    List<CategoryDO> list(Map<String, Object> map);

    int count(Map<String, Object> map);

    int save(CategoryDO category);

    int update(CategoryDO category);

    int remove(Long categoryId);

    Long[] listParentCategory();

    int getChildCategoryNumber(Long categoryId);

    int getCategoryProductNumber(Long categoryId);

    int saveProductPrice(List<ProductAmountDO> list);

    int saveProductAmount(ProductAmountDO productAmount);

    int updateProductAmount(ProductAmountDO productAmount);

    List<ProductAmountDO> priceList(Long cId);

    ProductAmountDO getProductAmount(Long pId);
}
