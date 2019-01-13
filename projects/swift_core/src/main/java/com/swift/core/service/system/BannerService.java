package com.swift.core.service.system;

import com.swift.core.domain.system.BannerDO;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 6/11/18.
 */
public interface BannerService {

    List<BannerDO> list(Map<String, Object> map);

    BannerDO get(Long bannerId);

    int count(Map<String, Object> map);

    int save(BannerDO banner);

    int update(BannerDO banner);

    int remove(Long bannerId);

    int batchRemove(Long[] bannerIds);
}
