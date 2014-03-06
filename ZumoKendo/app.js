var MyDemo = {
    run: function () {
        var client = new WindowsAzure.MobileServiceClient("https://petproj.azure-mobile.net/", "cwTLzDDhpGZIrOaqfweMSquRuyGmrd45");
        var table = client.getTable("games");
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    console.log(options.data);
                    table.skip(options.data.skip)
                         .take(options.data.take)
                         .includeTotalCount()
                         .read()
                         .done(options.success);
                },
                update: function (options) {
                    table.update(options.data)
                         .done(options.success);
                },
                create: function (options) {
                    var item = options.data;
                    delete item.id;
                    table.insert(item)
                         .done(options.success);
                },
                destroy: function (options) {
                    table.del(options.data)
                         .done(options.success);
                }
            },
            serverPaging: true,
            pageSize: 4,
            schema: {
                total: "totalCount",
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        developer: { type: "string" }
                    }
                }
            }
        });
        $("#grid").kendoGrid(
            {
                pageable: true,
                sortable: true,
                filterable: true,
                dataSource: dataSource,
                columns: [
                            "name",
                            "developer",
                            {
                                command: [
                                  { name: "edit", text: "Edit" },
                                  { name: "destroy", text: "Delete" }
                                ]
                            }],
                toolbar: [
                    { name: "create" }
                ],
                editable: "popup"
            }
        );
    }
};