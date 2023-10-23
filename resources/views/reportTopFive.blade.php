<style>
    * {
        margin: 0
    }

    .page-break {
        page-break-after: always;
    }

    .letterhead {
        padding: 20px;
        margin-bottom: 10px;
        border-bottom: 2px solid black;
    }

    .logo {
        margin: 0 20px;
        height: 80px;
        width: 80px;
        position: absolute;
    }

    .center {
        text-align: center;
        margin: 0 auto;
        width: 70%;
    }

    .content {
        padding: 20px;
    }

    .inline-block {
        display: inline-block;
    }

    .signature {
        margin-top: 20px;
    }

    ._signature_person {
        margin-top: 60px
    }

    ._signature_employee {
        margin-top: 60px
    }

    .right {
        float: right;
    }

    .left {
        float: left;
    }

    .tableCustom {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    .tableCustom td,
    .tableCustom th {
        border: 1px solid #ddd;
        padding: 8px;
        font-size: 13px;
    }

    .tableCustom tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .tableCustom tr:hover {
        background-color: #ddd;
    }

    .tableCustom th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #000000;
        color: white;
    }

    .title {
        font-size: 30px;
        text-align: left;
        font-weight: 100;
        margin-bottom: 20px;
    }
</style>
<div class="letterhead">
    {{-- <img src="data:image/png;base64,{{ $image }}" class="logo" alt="Logo" /> --}}
    <div class="center">
        <h1>Report Top Five item</h1>
    </div>
</div>

<div class="content">
    <table class="tableCustom">
        <thead>
            <tr>
                <td>Rank</td>
                <td> First Item </td>
                <td> Second Item </td>
                <td>Support</td>
                <td>Confidence</td>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $key => $datum)
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $datum->antecedentConcat }}</td>
                    <td>{{ $datum->consequentConcat }}</td>
                    <td>{{ $datum->support }}</td>
                    <td>{{ $datum->confidence }}</td>
                </tr>
            @endforeach

        </tbody>
    </table>
    <div>
        <div class="inline-block signature left">
            <div class="_signature_date">Signature</div>
            <div class="_signature_employee">
                <div>Admin</div>
                <div><strong><u>{{ auth()->user()->name }}</u></strong></div>
            </div>
        </div>
        <div class="inline-block signature right">
            <div class="_signature_date">Tangerang,{{ date('d-F-Y') }}</div>
            <div class="_signature_person">
                <div>Owner</div>
                <div><strong><u>Eddy Suwanto</u></strong></div>
            </div>
        </div>
    </div>
</div>
