<template>
    <Row>
        <Col offset="6">
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
    </Row>
</template>


<script>
    import 'iview/dist/styles/iview.css'

    export default {
        mounted: () => {
            let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
            let oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
            chrome.history.search({
                    'text': '',              // Return every history item....
                    'startTime': oneWeekAgo  // that was accessed less than one week ago.
                },
                function (historyItems) {
                    console.log(historyItems);
                });
        }
    }
</script>
