import {showContent} from '/js/utils.js';

class Handlers {
    listQuestion() {
        document.getElementById('create-tests').addEventListener('click', function () {
            showContent('create-tests-content');
        });
    }

    clickOnTopics() {
        document.querySelectorAll('.theme-item').forEach(function (item) {
            item.addEventListener('click', function () {
                if (item.dataset.theme === 'safety') {
                    showContent('safety-content');
                }
            });
        });
    }

    async clickOnQuestionList() {
        document.getElementById('question-list').addEventListener('click', async () => {
            try {
                const response = await fetch('/admin-panel/questions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify({
                    //     action,
                    //     isSuccess,
                    //     _csrf,
                    // })
                });
            } catch (error) {
                console.error(error);
            }
        });

    }
}

export default new Handlers();
