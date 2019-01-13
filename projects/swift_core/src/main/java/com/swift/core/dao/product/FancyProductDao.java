package com.swift.core.dao.product;

import com.swift.core.domain.product.FancyViewDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 29/10/18.
 */

@Mapper
public interface FancyProductDao {

    int addNewView(FancyViewDO fancyView);

    int saveView(FancyViewDO fancyView);

    List<FancyViewDO> listView(Map<String, Object> map);

    int removeView(Long viewId);

    int countView(Map<String, Object> map);

    void updateCategory(@Param("title") String title, @Param("categoryId") Integer categoryId);

    void updateViewOrder(@Param("viewOrder") Integer viewOrder, @Param("viewId") Integer viewId);

    int fancyProductCount(Map<String, Object> map);

    FancyViewDO getFancyViewById(@Param("viewId") Integer viewId);
}
