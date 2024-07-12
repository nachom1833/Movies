package com.ar.movies;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/*")
public class CorsFilter implements Filter{

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
                HttpServletRequest httpRequest=  (HttpServletRequest)request;
                HttpServletResponse httpResponse = (HttpServletResponse)response;

               httpResponse.setHeader("Access-Control-Allow-Origin", "*");
               
               httpResponse.setHeader("Access-Control-Allow-Methods", "*");

               httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        
               httpResponse.setHeader("Access-Control-Max-Age","600");

                httpRequest.setCharacterEncoding("UTF-8");
               httpResponse.setCharacterEncoding("UTF-8");

               if("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())){
                httpResponse.setStatus(HttpServletResponse.SC_OK);
               }

               chain.doFilter(request, response);
    }

}
