package com.nemeros.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.nemeros.bean.MedBean;

@Component
public class SupervisionDao {

	private JdbcTemplate template;

	@Autowired 
	private void setTemplate(final DataSource datasource){
		template = new JdbcTemplate(datasource);
	}
	
	
	public List<MedBean> getListMediation(Date dateMin){
		StringBuilder query = new StringBuilder(300);
		
		query.append("with tmp as ( ");
		query.append("select MEDIDMED, styidsty, stt_ts_cre, row_number() over(partition by stt.msgidmsg order by stt_ts_cre desc) as rnk ");
		query.append("from T_WBI_EVT evt ");
		query.append("inner join T_MESSAGE msg on MSG.WBIIDWBI = EVT.WBIIDWBI ");
		query.append("inner join T_STATUT_MSG stt on MSG.MSGIDMSG = STT.MSGIDMSG ");
		query.append(" where (wbidte_entry > ? or ? is null) ");
		query.append(") ");
		query.append("select med.medidmed as id, flu_desc, med_name, ");
		query.append("sum(case when styidsty = 'EXI' then 1 else 0 end) as cnt_ok, ");
		query.append("sum(case when styidsty = 'ENT' then 1 else 0 end) as cnt_enc, ");
		query.append("sum(case when styidsty = 'FAI' then 1 else 0 end) as cnt_ko, ");
		query.append("count(*) as cnt ");
		query.append("from T_MEDIATION MED ");
		query.append("inner join T_FLUX_FCT fct on FCT.FLUIDFLU = MED.FLUIDFLU ");
		query.append("left outer join tmp on tmp.medidmed = med.medidmed and tmp.rnk = 1 ");
		query.append("group by med.medidmed, flu_desc, med_name ");
		query.append("order by 2, 3 ");
		
		List<MedBean> retour = this.template.query(query.toString(),new Object[]{dateMin, dateMin},
				new RowMapper<MedBean>(){

					@Override
					public MedBean mapRow(ResultSet rs, int arg1) throws SQLException {
						
						return new MedBean(
								rs.getInt("id"),
								rs.getString("flu_desc"),
								rs.getString("MED_NAME"),
								rs.getInt("cnt_ok"),
								rs.getInt("cnt_enc"),
								rs.getInt("cnt_ko"),
								rs.getInt("cnt"));
					}
					
				});
		
		return retour;
	}
	
}
