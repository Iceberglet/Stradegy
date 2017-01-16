package com.stradegy.dao;

import com.stradegy.enums.Product;
import com.stradegy.history.quotes.BaseQuote;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

/**
 * Created by User on 13/1/2017.
 */
@Service("HibernateDao")
@Transactional(propagation = Propagation.REQUIRED)
public class HibernateDaoImpl implements HibernateDao {

	@Autowired
	@Qualifier("sessionFactory")
	SessionFactory sessionFactory ;

	@Override
	public BaseQuote save(BaseQuote baseQuote) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.save( baseQuote );
		session.getTransaction().commit();
		session.close();
		return baseQuote;
	}

	@Override
	public Collection<BaseQuote> saveAll(Collection<BaseQuote> baseQuotes) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		for(BaseQuote baseQuote : baseQuotes)
			session.save( baseQuote );
		session.getTransaction().commit();
		session.close();
		return baseQuotes;
	}

	@Override
	public BaseQuote query(Long timestamp, Product product) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String queryString = "from BaseQuote where timestamp = :time and product = :product";
		Query query = session.createQuery(queryString);
		query.setParameter("time", timestamp);
		query.setParameter("product", product);
		BaseQuote result = (BaseQuote)query.list().iterator().next();
		session.getTransaction().commit();
		session.close();
		return result;
	}

	@Override
	public Collection<BaseQuote> query(Long timeStart, Long timeEnd, Product product) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		String queryString = "from BaseQuote where timestamp > :start and timestamp < :end and product = :product";
		Query query = session.createQuery(queryString);
		query.setParameter("start", timeStart);
		query.setParameter("end", timeEnd);
		query.setParameter("product", product);
		Collection<BaseQuote> result = (Collection<BaseQuote>)query.list();
		session.getTransaction().commit();
		session.close();
		return result;
	}
}
