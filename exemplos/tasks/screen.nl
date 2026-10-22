<nativelayout>

<link rel="stylesheet" href="theme.css">

<body>
    <div class="head">
        <h1>Tasks</h1>
        <p class="sub">{pending} pending, {done} done</p>
    </div>

    <div class="track">
        <div class="fill" style="width: {percent}%"></div>
    </div>

    <div class="row">
        <input id="title" placeholder="What needs doing?">
        <button id="add">Add</button>
    </div>

    <div class="filters">
        if filter == "all":
            <button id="show-all" class="chip-on">All {total}</button>
        else:
            <button id="show-all" class="chip">All {total}</button>
        end
        if filter == "pending":
            <button id="show-pending" class="chip-on">Pending {pending}</button>
        else:
            <button id="show-pending" class="chip">Pending {pending}</button>
        end
        if filter == "done":
            <button id="show-done" class="chip-on">Done {done}</button>
        else:
            <button id="show-done" class="chip">Done {done}</button>
        end
    </div>

    if shown.size == 0:
        <div class="center">
            <p class="muted">{empty}</p>
        </div>
    else:
        for task in shown:
            <div class="card">
                if task.done:
                    <div class="box-on"></div>
                    <p class="t-done">{task.title}</p>
                else:
                    <div class="box"></div>
                    <p class="t">{task.title}</p>
                end
                <button class="remove">Remove</button>
            </div>
        end
    end

    if done > 0:
        <button id="clear" class="ghost">Clear completed</button>
    end
</body>

</nativelayout>