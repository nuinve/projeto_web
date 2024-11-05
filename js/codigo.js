// cadastro
document.addEventListener("DOMContentLoaded", function() {
    // Verificação do cadastro
    const isRegistered = localStorage.getItem('isRegistered');
    if (!isRegistered && window.location.pathname.includes('tarefas.html')) {
        window.location.href = 'index.html';
        return;
    }

    // Menu toggle
    const menuBtn = document.querySelector('.btn_menu');
    const menu = document.querySelector('nav.menu');
    const mainContent = document.querySelector('.main');
    if (menuBtn && menu && mainContent) {
        menuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            mainContent.classList.toggle('active');
        });
    }

    // Gráfico de progresso
    const ctx = document.getElementById('progressChart');
    if (ctx) {
        const chart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Completas', 'Incompletas'],
                datasets: [{
                    data: [0, 1],
                    backgroundColor: ['#4862BC', '#D6E0EA']
                }]
            }
        });

        // Funções de atualização de progresso
        const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        let tasks = [];
        let completedTasks = 0;

        if (taskForm && taskInput && taskList) {
            taskForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const taskText = taskInput.value.trim();
                if (taskText !== '') {
                    addTask(taskText);
                    taskInput.value = '';
                }
            });

            function addTask(taskText) {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span>${taskText}</span>
                    <input type="checkbox" class="form-check-input">
                `;
                taskList.appendChild(li);
                tasks.push({ text: taskText, completed: false });
                updateProgress();
            }

            taskList.addEventListener('change', function(e) {
                if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                    const index = Array.from(taskList.children).indexOf(e.target.parentElement);
                    tasks[index].completed = e.target.checked;
                    updateProgress();
                }
            });

            function updateProgress() {
                completedTasks = tasks.filter(task => task.completed).length;
                chart.data.datasets[0].data[0] = completedTasks;
                chart.data.datasets[0].data[1] = tasks.length - completedTasks;
                chart.update();
            }
        }
    }

    // Função de registro do usuário
    window.registrarUsuario = function() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        if (nome && email && senha) {
            localStorage.setItem('isRegistered', 'true');
            localStorage.setItem('userName', nome);

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'tarefas.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };
});
