/* jshint browser: true */
/* jshint devel: true */
/* eslint-env browser: true */
/* globals document, google, task_array */
google.charts.load( 'current', { packages: [ 'gantt', 'corechart' ] });

function drawGanttChart() {
  const data = new google.visualization.DataTable();
  data.addColumn( 'string', 'Task ID' );
  data.addColumn( 'string', 'Task Name' );
  data.addColumn( 'string', 'Resource' );
  data.addColumn( 'date', 'Start Date' );
  data.addColumn( 'date', 'End Date' );
  data.addColumn( 'number', 'Duration' );
  data.addColumn( 'number', 'Percent Complete' );
  data.addColumn( 'string', 'Dependencies' );

  data.addRows( task_array.map( x => [
    x.id,
    x.name,
    x.resource,
    x.start ? new Date( x.start ) : null,
    x.end ? new Date( x.end ) : null,
    x.duration,
    x.progress || 0,
    x.dependencies,
  ]));

  const options = {
    title: 'A Gantt',
    // @@@ 42*N + 50?
    height: ( 42 * 5 ) + 50,
    gantt: {
      labelStyle: {
        fontName: 'Source Code Pro',
      },
    },
  };

  const chart = new google.visualization.Gantt( document.getElementById( 'gantt_chart' ));

  chart.draw( data, options );
}

function drawTimeChart() {
  const data = google.visualization.arrayToDataTable([
    [ 'Year', 'Sales', 'Expenses' ],
    [ '2010', 800, 310 ],
    [ '2011', 850, 380 ],
    [ '2012', 1120, 420 ],
    [ '2013', 1000, 400 ],
    [ '2014', 1170, 460 ],
    [ '2015', 660, 1120 ],
    [ '2016', 1030, 540 ],
  ]);

  const options = {
    legend: { position: 'bottom' },
    vAxis: { minValue: 0 },
    pointSize: 4,
  };

  const chart = new google.visualization.AreaChart( document.getElementById( 'time_chart' ));
  chart.draw( data, options );
}

// Set the onLoad callback.
google.charts.setOnLoadCallback(() => {
  drawGanttChart();
  drawTimeChart();
});
