const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const notes = [
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex, repellat velit esse officia, expedita laudantium consequatur itaque nemo, possimus nesciunt. Iusto dolore magni impedit beatae error! Vel dolorem corporis placeat consequuntur, nihil harum alias, dicta quidem incidunt accusantium nemo cupiditate quia reprehenderit, illum provident doloremque quasi sit ipsum aspernatur?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quaerat quasi sunt eligendi vitae fugiat ex quod accusamus eius modi aperiam quam obcaecati animi iusto nihil omnis, sint asperiores optio, inventore deleniti. In recusandae minima, doloribus quisquam consequatur sit explicabo praesentium iure quasi! Laborum error reprehenderit hic accusantium, perspiciatis voluptatibus tempora provident, eum necessitatibus consequuntur iste. Tempore necessitatibus voluptate distinctio nemo recusandae obcaecati iure, voluptatem quis cum, aspernatur, quibusdam facere!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ex ipsa, debitis molestiae sit quasi totam itaque tenetur reiciendis commodi expedita ea nostrum dolor impedit rerum officiis atque ut excepturi.",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, commodi? Praesentium, dolorum ut optio odit facilis modi voluptate nihil hic voluptas corporis necessitatibus, perferendis labore tempora libero recusandae possimus ipsa, aliquam doloremque? Minima non vero provident reprehenderit dolorem blanditiis, voluptate adipisci cumque ab omnis, nulla iste labore odit! Architecto nulla nihil repellendus nam error sunt! Atque, cupiditate unde. Animi, possimus saepe repellendus sunt ex veritatis fugiat porro ad repudiandae explicabo id atque provident a inventore, dolore laboriosam laudantium hic, architecto eligendi magni. Maiores, consequatur sapiente officiis deserunt alias iste libero.",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex, repellat velit esse officia, expedita laudantium consequatur itaque nemo, possimus nesciunt. Iusto dolore magni impedit beatae error! Vel dolorem corporis placeat consequuntur, nihil harum alias, dicta quidem incidunt accusantium nemo cupiditate quia reprehenderit, illum provident doloremque quasi sit ipsum aspernatur?",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex, repellat velit esse officia, expedita laudantium consequatur itaque nemo, possimus nesciunt. Iusto dolore magni impedit beatae error! Vel dolorem corporis placeat consequuntur, nihil harum alias, dicta quidem incidunt accusantium nemo cupiditate quia reprehenderit, illum provident doloremque quasi sit ipsum aspernatur?",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex, repellat velit esse officia, expedita laudantium consequatur itaque nemo, possimus nesciunt. Iusto dolore magni impedit beatae error! Vel dolorem corporis placeat consequuntur, nihil harum alias, dicta quidem incidunt accusantium nemo cupiditate quia reprehenderit, illum provident doloremque quasi sit ipsum aspernatur?",
];

app.get("/api", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

module.exports = app;
