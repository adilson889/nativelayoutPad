<nativelayout>
<link rel="stylesheet" href="theme.css">

<body>
    <h1>Hello, {name}</h1>

    if items.size == 0:
        <p class="muted">Nothing yet.</p>
    else:
        for item in items:
            <div class="card">
                <p>{item}</p>
            </div>
        end
    end

    <button id="go">Say hi</button>
</body>
</nativelayout>
