package com.nemeros.bean;

public class MedBean {
	private int id;
	private String fluxDesc;
	private String medName;
	private int cnt_ok;
	private int cnt_enc;
	private int cnt_ko;
	private int cnt;
	
	public MedBean(){
		
	}
	
	public MedBean(int id, String fluxDesc, String medName, int cnt_ok, int cnt_enc, int cnt_ko, int cnt) {
		super();
		this.id = id;
		this.fluxDesc = fluxDesc;
		this.medName = medName;
		this.cnt_ok = cnt_ok;
		this.cnt_enc = cnt_enc;
		this.cnt_ko = cnt_ko;
		this.cnt = cnt;
	}
	
	public String getMedName() {
		return medName;
	}
	public void setMedName(String medName) {
		this.medName = medName;
	}
	public int getCnt_ok() {
		return cnt_ok;
	}
	public void setCnt_ok(int cnt_ok) {
		this.cnt_ok = cnt_ok;
	}
	public int getCnt_enc() {
		return cnt_enc;
	}
	public void setCnt_enc(int cnt_enc) {
		this.cnt_enc = cnt_enc;
	}
	public int getCnt_ko() {
		return cnt_ko;
	}
	public void setCnt_ko(int cnt_ko) {
		this.cnt_ko = cnt_ko;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}

	public String getFluxDesc() {
		return fluxDesc;
	}

	public void setFluxDesc(String fluxDesc) {
		this.fluxDesc = fluxDesc;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
