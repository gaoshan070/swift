package com.swift.core.common.utils;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 查询参数
 */
public class Query extends LinkedHashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	// 
	private int offset;
	// 每页条数
	private int limit;

	public Query(Map<String, Object> params, boolean noOffSet) {
		this.putAll(params);
	}
	public Query(Map<String, Object> params) {
		this.putAll(params);
		// 分页参数
		this.offset = Integer.parseInt(params.get("offset").toString());
		this.limit = Integer.parseInt(params.get("limit").toString());
		this.put("offset", offset);
		this.put("page", offset / limit + 1);
		this.put("limit", limit);
	}

	public String getValueAsString(String key) {
		String result = String.valueOf(this.get(key));
		if(StringUtils.isNotBlank(result)){
			return result;
		}else{
			return StringUtils.EMPTY;
		}
	}

	public Integer getValueAsInt(String key) {
		try {
			Integer result = Integer.valueOf(getValueAsString(key));
			if (result != null) {
				return result;
			} else {
				return null;
			}
		}catch (Exception e){
			return null;
		}
	}

	public String[] getValueAsArray(String key) {
		String result = getValueAsString(key);
		return result.split(",");
	}


	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.put("offset", offset);
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
}
