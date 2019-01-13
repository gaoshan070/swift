package com.swift.core.service.user.impl;

import com.swift.core.dao.user.AccountDao;
import com.swift.core.domain.user.AccountDO;
import com.swift.core.service.user.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by gaoshan on 9/11/18.
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountMapper;

    @Override
    public AccountDO get(Long accountId) {
        return accountMapper.get(accountId);
    }

    @Override
    public List<AccountDO> list(Map<String, Object> map) {
        return accountMapper.list(map);
    }

    @Override
    public int count(Map<String, Object> map) {
        return accountMapper.count(map);
    }

    @Override
    public int update(AccountDO account) {
        return accountMapper.update(account);
    }

    @Override
    public int remove(Long accountId) {
        return accountMapper.remove(accountId);
    }
}
