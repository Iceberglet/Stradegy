package com.stradegy;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.DefaultHighLowDataset;
import org.jfree.ui.ApplicationFrame;

/**
 * Created by Iceberglet on 21/1/2017.
 */
public class ChartClass extends ApplicationFrame {

	public ChartClass(final String title) {

		super(title);

		final DefaultHighLowDataset dataset = DemoDatasetFactory.createHighLowDataset();
		final JFreeChart chart = createChart(dataset);

		chart.getXYPlot().setOrientation(PlotOrientation.VERTICAL);
		final ChartPanel chartPanel = new ChartPanel(chart);
		chartPanel.setPreferredSize(new java.awt.Dimension(500, 270));
		setContentPane(chartPanel);

	}


	/**
	 * Creates a chart.
	 *
	 * @param dataset  the dataset.
	 *
	 * @return The dataset.
	 */
	private JFreeChart createChart(final DefaultHighLowDataset dataset) {
		final JFreeChart chart = ChartFactory.createCandlestickChart(
				"Candlestick Demo",
				"Time",
				"Value",
				dataset,
				true
		);
		return chart;
	}
}
