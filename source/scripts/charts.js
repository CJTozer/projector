/* jshint browser: true */
/* jshint devel: true */
/* eslint-env browser: true */
/* globals document, google */
google.charts.load( 'current', { packages: [ 'gantt', 'corechart' ] });

/* globals task_array */
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
    height: ( 33 * task_array.length ) + 50,
    gantt: {
      labelStyle: {
        fontName: 'Source Code Pro',
      },
      barHeight: 20,
    },
  };

  const chart = new google.visualization.Gantt( document.getElementById( 'gantt_chart' ));

  chart.draw( data, options );
}

/* globals time_data */
function drawTimeChart() {
  const data = new google.visualization.DataTable();
  data.addColumn( 'date', 'Date' );
  data.addColumn( 'number', 'Done' );
  data.addColumn( 'number', 'Planned' );
  data.addColumn( 'number', 'Unplanned' );
  data.addColumn( 'number', 'Gain' );

  Object.keys( time_data ).forEach(( x ) => {
    console.log( x );
    const row = time_data[ x ];
    const budget = row.budget || 0;
    const done = row.done || 0;
    const todo = row.todo || 0;
    const unplanned = row.unplanned || 0;
    const gain = budget - done - todo - unplanned;
    data.addRow([
      new Date( x ),
      done,
      todo,
      unplanned,
      gain,
    ]);
  });

  const options = {
    legend: { position: 'bottom' },
    height: 360,
    isStacked: true,
    vAxis: { minValue: 0 },
    hAxis: { slantedText: false },
    pointSize: 4,
    chartArea: {
      left: 40,
      right: 40,
      top: 20,
      bottom: 40,
    },
  };

  const chart = new google.visualization.AreaChart( document.getElementById( 'time_chart' ));
  chart.draw( data, options );
}

// Set the onLoad callback.
google.charts.setOnLoadCallback(() => {
  drawGanttChart();
  drawTimeChart();
});
