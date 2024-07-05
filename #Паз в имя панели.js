let und = 0;
Model.forEachPanel(function(panel) {
    if (panel.Cuts.Count) {
        for (let i = 0; i < panel.Cuts.Count; i++) {
            if (!panel.Name.includes("Паз Подсветка") &&
                panel.Cuts[i].Sign.includes("16,2")
            ) {
                Undo.RecursiveChanging(Model);
                panel.Name += " Паз Подсветка";
            } else if (!panel.Cuts[i].Sign.includes("16,2") && !panel.Cuts[i].Sign.includes("4*6") && !Model.UserProperty["Больше не показывать"]) {
                panel.Selected = true;
                und++;
            }
        }
    }
});


//-- window Window1
Window1 = {
    Form: NewForm()
};
Props = Window1.Form.Properties;
Window1.Form.Width = 276;
Window1.Form.Height = 200;
Window1.Form.Caption = "Неизвестный паз";
Window1.Form.OKButton = true;
Window1.Form.CancelButton = false;
Window1.Form.Resizable = true;
//-- window Window1 properties

if (Model.UserProperty["Больше не показывать"]) {
    Window1.Bool1 = Props.NewBool(
        "Больше не показывать",
        Model.UserProperty["Больше не показывать"]
    );
} else {
    Window1.Bool1 = Props.NewBool("Больше не показывать", false);
}

Window1.Bool1.SetLayout(101, 83, 147, 22);
Window1.Bool1.Enabled = true;
Window1.Bool1.Visible = true;
Window1.Label1 = Props.NewLabel(
    "Неопределённый паз, при необходимости внести в название руками!"
);
Window1.Label1.SetLayout(11, 13, 227, 30);
Window1.Label1.WordWrap = true;

//-- window Window1 events

Window1.Bool1.OnChange = function() {
    Undo.RecursiveChanging(Model);
    Model.UserProperty["Больше не показывать"] = true;
};
//-- window Window1 ends
if (!Model.UserProperty["Больше не показывать"] == true && und) {
    Window1.Form.ShowModal();
}

Window1.Form.OnOkButtonClick = function() {
    Action.Finish();
};
Action.Commit();