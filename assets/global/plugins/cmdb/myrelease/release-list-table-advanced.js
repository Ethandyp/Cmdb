var TableAdvanced = function () {

    var initTable4 = function () {
        var table = $('#svn_list');

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement('th');
        nCloneTh.className = "table-checkbox";

        var nCloneTd = document.createElement('td');
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        table.find('thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        table.find('tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });

        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "未有相关数据",
                "info": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
                "infoEmpty": "当前显示0到0条，共0条记录",
                "infoFiltered": "(数据库中共为 _MAX_ 条记录)",
                "lengthMenu": "显示 _MENU_ 记录",
                "search": "模糊查询:",
                "zeroRecords": "对不起，查询不到任何相关数据",
               "oPaginate": {
                   "sFirst": "首页",
                   "sPrevious": " 上一页 ",
                   "sNext": " 下一页 ",
                   "sLast": " 尾页 "
               }				
            },

            "columnDefs": [{
                "orderable": false,
                "targets": [0]
            }],
            "order": [
                [2, 'dec']
            ],
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10
        });

        var tableWrapper = $('#sample_4_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
        var tableColumnToggler = $('#sample_4_column_toggler');

        /* modify datatable control inputs */
        tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        table.on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose(nTr);
            } else {
                var svn_name = $(this).parent().parent().find('td').eq(1).attr("svn_name");
                $(this).addClass("row-details-open").removeClass("row-details-close");;
                fnFormatDetails(nTr, $(this).attr("data_id"),svn_name);
            }
        });
          function fnFormatDetails(nTr, pdataId, svn_name) {
                var aData = oTable.fnGetData(nTr);
               //根据配置Id 异步查询数据
                $.ajax({
                       type:'get',
                       url:"../release_host_ajax/?svn_name="+svn_name,
                       data:{"pdataId":pdataId},
                       dataType:"json",
                       async:true,
                       beforeSend:function(xhr){//信息加载中
                           oTable.fnOpen( nTr, '<span id="configure_chart_loading"><img src="../assets/global/img/input-spinner.gif"/> 详细信息加载中...</span>', 'details' );
                       },
                       success:function (obj){
                               var sOut = '<table>';
//                                    sOut += '<tr><td>设备型号:</td><td>' + aData[13] + '</td></tr>';
                               for(var id in obj){
                                    sOut += '<tr><td>'+id+'</td><td>' + obj[id] + '</td></tr>';
                               }
                               sOut+='</table>';
                               oTable.fnOpen( nTr,sOut, 'details' );

                       },
                       error: function(){//请求出错处理
                           oTable.fnOpen( nTr,'加载数据超时', 'details' );
                       }
                   });

           }

        /* handle show/hide columns*/
        $('input[type="checkbox"]', tableColumnToggler).change(function () {
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
            oTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });

    }

    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            console.log('me 1');


            initTable4();


            console.log('me 2');
        }

    };

}();