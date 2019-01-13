package com.swift.core.service.system.impl;

import com.swift.core.dao.system.BannerDao;
import com.swift.core.domain.system.BannerDO;
import com.swift.core.service.system.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 6/11/18.
 */
@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerDao bannerMapper;

    @Override
    public List<BannerDO> list(Map<String, Object> map) {
        return bannerMapper.list(map);
    }

    @Override
    public BannerDO get(Long bannerId) {
        return bannerMapper.get(bannerId);
    }

    @Override
    public int count(Map<String, Object> map) {
        return bannerMapper.count(map);
    }

    @Override
    public int save(BannerDO banner) {
        return bannerMapper.save(banner);
    }

    @Override
    public int update(BannerDO banner) {
        return bannerMapper.update(banner);
    }

    @Override
    public int remove(Long bannerId) {
        return bannerMapper.remove(bannerId);
    }

    @Override
    public int batchRemove(Long[] bannerIds) {
        return bannerMapper.batchRemove(bannerIds);
    }
}
