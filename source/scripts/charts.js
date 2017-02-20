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

/* globals time_data */
function drawTimeChart() {
  console.log( time_data );

  // Version 2: DataTable.addRows
  const data = new google.visualization.DataTable();
  data.addColumn( 'date', 'Date' );
  data.addColumn( 'number', 'Done' );
  data.addColumn( 'number', 'Planned' );
  data.addColumn( 'number', 'Unplanned' );
  data.addColumn( 'number', 'Gain' );

  Object.keys( time_data ).forEach(( x ) => {
    console.log( x );
    const row = time_data[ x ];
    data.addRow([
      new Date( x ),
      row.done || 0,
      row.planned || 0,
      row.unplanned || 0,
      row.gain || 0,
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
