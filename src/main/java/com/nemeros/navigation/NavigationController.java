package com.nemeros.navigation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NavigationController {

	//@RequestMapping(path={"/", "/index"})
	public String getHome(){
		return "index.html";
	}
}
