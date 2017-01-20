package com.thingword.powermonitor.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import com.thingword.powermonitor.dao.StatusDao;
import com.thingword.powermonitor.db.Status;
import com.thingword.powermonitor.util.HibernateUtil;

public class StatusDaoImpl implements StatusDao{

	@Override
	public boolean insert(Status status) {
		SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
		Session s = null;
		Transaction t = null;
		boolean flag = false;
		try {
			s = sessionFactory.openSession();
			t = s.beginTransaction();
			s.save(status);
			t.commit();
			flag = true;
		} catch (Exception err) {
			t.rollback();
			err.printStackTrace();
		} finally {
			s.close();
		}
		return flag;
	}

	@Override
	public List<Status> getStatus(String start, String end) {
		SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
		Session s = null;
		Transaction t = null;
		List<Status> ls = null;
		try {
			s = sessionFactory.openSession();
			t = s.beginTransaction();
			String hql = "From Status where time >= '"+start+"' and time <= '"+end+"'";
			Query query = s.createQuery(hql);
			ls = query.list();
			t.commit();
		} catch (Exception err) {
			t.rollback();
			err.printStackTrace();
		} finally {
			s.close();
		}
		return ls;
	}

}
