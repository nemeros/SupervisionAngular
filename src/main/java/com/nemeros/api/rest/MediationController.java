package com.nemeros.api.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nemeros.bean.MedBean;
import com.nemeros.dao.SupervisionDao;

@RestController
@RequestMapping("/api/mediation")
public class MediationController {
	
	private final static Logger log = Logger.getLogger(MediationController.class);
	
	@Autowired
	SupervisionDao supDao;
	
	
	@RequestMapping(method=RequestMethod.GET, produces="application/json") 
	public List<MedBean> getDetail(
			@RequestParam(value="dateMin", required=false) @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date dateMin)
					throws Exception{
		log.info("DateMin : " + dateMin);
		List<MedBean> retour = null;
		
		retour = supDao.getListMediation(dateMin);
		
		return retour;
	}	
}
