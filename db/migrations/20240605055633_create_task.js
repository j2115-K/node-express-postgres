<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <link rel="stylesheet" href="/styles.css">
  <style>
    table {
      width: 100%;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .bg-yellow {
      background-color: #ffeb3b;
    }
    .bg-red {
      background-color: #f44336;
      color: white;
    }
    .bg-white {
      background-color: #ffffff;
    }
  </style>
</head>
<body>
  <%- include('./header'); %>
  <div class="container mt-4">
    <%- include('./error_messages'); %>
    <% if (isAuth) { %>
      <div class="row">
        <div class="col-md-6">
          <h2>タスクの追加</h2>
          <form action="/" method="post" class="mb-4">
            <div class="form-group">
              <label for="add">タスク</label>
              <input required type="text" name="add" id="add" class="form-control" placeholder="何をする?" />
            </div>
            <div class="form-group">
              <label for="deadline">締め切り</label>
              <input type="date" name="deadline" id="deadline" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">追加</button>
          </form>
        </div>
        <div class="col-md-6">
          <h2>タスクリスト</h2>
          <table id="todo-table" class="table table-striped">
            <thead>
              <tr>
                <th>タスク</th>
                <th>締め切りまでの日数</th>
              </tr>
            </thead>
            <tbody>
              <% for (let todo of todos) { %>
                <tr class="<% if (todo.daysLeft === null) { %>bg-white<% } else if (todo.daysLeft <= 7) { %>bg-yellow<% } else if (todo.daysLeft < 0) { %>bg-red<% } %>">
                  <td><%= todo.content %></td>
                  <td>
                    <% if (todo.daysLeft !== null) { %>
                      <%= todo.daysLeft %> 日
                    <% } else { %>
                      なし
                    <% } %>
                  </td>
                </tr>
              <% } %>
            </tbody>
          </table>
        </div>
      </div>
    <% } else { %>
      <div class="text-center mt-5">
        <h1>TodoAppへようこそ</h1>
        <a class="btn btn-primary mt-3" href="/signup" role="button">今すぐサインアップ！</a>
      </div>
    <% } %>
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
          integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
          crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
          integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
          crossorigin="anonymous"></script>
</body>
</html>
