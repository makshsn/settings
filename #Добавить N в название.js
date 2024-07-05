Undo.RecursiveChanging(Model)

const NMN=prompt('Что добавить:')
Model.forEachPanel(function(obj) {
        if (obj.Selected){
        obj.Name += " "+NMN
        obj.Build();
        }
        });

Model.Build();