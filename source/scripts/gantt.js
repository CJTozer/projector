google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task ID');
  data.addColumn('string', 'Task Name');
  data.addColumn('string', 'Resource');
  data.addColumn('date', 'Start Date');
  data.addColumn('date', 'End Date');
  data.addColumn('number', 'Duration');
  data.addColumn('number', 'Percent Complete');
  data.addColumn('string', 'Dependencies');

  // @@@ Data should be fed in here as:
  // - Start date - specified
  // - End data - max of time remaining and specified end date
  // - Percent completion - calculate from done/todo
  var task_array = project_data.tasks.map(function(x) {
    return [
      x.id,
      x.description,
      x.group,
      x.start ? new Date(x.start) : null,
      x.end ? new Date(x.end) : null,
      x.done + x.left,
      100 * x.done / (x.done + x.left),
      x.dependencies,
    ];
  });
  data.addRows(task_array);

  var options = {
    // @@@ 42*N + 50?
    height: 42 * 5 + 50
  };

  var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  chart.draw(data, options);
}
console.log('Good bye!');
