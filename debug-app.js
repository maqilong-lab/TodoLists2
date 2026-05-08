// 调试版本的app.js
console.log('开始加载NEXUS TASK应用...');

// 任务数据
let tasks = [];
let currentFilter = 'all';
let searchTerm = '';
let deleteTaskId = null;

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化...');
    try {
        createParticles();
        loadTasks();
        updateStats();
        renderTasks();
        updateCountdowns();
        setInterval(updateCountdowns, 60000);
        console.log('应用初始化完成');
    } catch (error) {
        console.error('应用初始化出错:', error);
    }
});

// 创建背景粒子
function createParticles() {
    console.log('创建背景粒子...');
    try {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) {
            console.error('找不到particles容器');
            return;
        }
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particleContainer.appendChild(particle);
        }
        console.log('背景粒子创建完成');
    } catch (error) {
        console.error('创建粒子出错:', error);
    }
}

// 任务构造函数
function Task(id, title, description, dueDate, priority, category, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
}

// 添加任务
function addTask() {
    console.log('addTask函数被调用');
    try {
        const titleElement = document.getElementById('taskTitle');
        const descElement = document.getElementById('taskDesc');
        const dueDateElement = document.getElementById('taskDueDate');
        const priorityElement = document.getElementById('taskPriority');
        const categoryElement = document.getElementById('taskCategory');

        if (!titleElement || !descElement || !dueDateElement || !priorityElement || !categoryElement) {
            console.error('找不到表单元素:', {
                title: titleElement,
                desc: descElement,
                dueDate: dueDateElement,
                priority: priorityElement,
                category: categoryElement
            });
            alert('表单元素加载失败，请刷新页面重试');
            return;
        }

        const title = titleElement.value.trim();
        const description = descElement.value.trim();
        const dueDate = dueDateElement.value;
        const priority = priorityElement.value;
        const category = categoryElement.value;

        console.log('获取到的表单值:', { title, description, dueDate, priority, category });

        if (!title) {
            alert('请输入任务标题');
            return;
        }

        const newTask = new Task(
            Date.now(),
            title,
            description,
            dueDate,
            priority,
            category,
            false
        );

        console.log('创建新任务:', newTask);

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        updateStats();

        // 清空输入框
        titleElement.value = '';
        descElement.value = '';
        dueDateElement.value = '';
        dueDateElement.classList.remove('has-value');

        console.log('任务添加成功，当前任务数量:', tasks.length);
        alert('任务添加成功！');

    } catch (error) {
        console.error('添加任务时出错:', error);
        alert('添加任务失败: ' + error.message);
    }
}

// 其他函数保持不变，只是添加了错误处理
function loadTasks() {
    try {
        const saved = localStorage.getItem('nexusTasks');
        if (saved) {
            tasks = JSON.parse(saved);
            console.log('从localStorage加载了', tasks.length, '个任务');
        } else {
            console.log('localStorage中没有保存的任务');
        }
    } catch (error) {
        console.error('加载任务出错:', error);
        tasks = [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem('nexusTasks', JSON.stringify(tasks));
        console.log('任务已保存到localStorage');
    } catch (error) {
        console.error('保存任务出错:', error);
    }
}

function renderTasks() {
    try {
        const taskList = document.getElementById('taskList');
        if (!taskList) {
            console.error('找不到taskList容器');
            return;
        }

        console.log('渲染任务列表，当前任务数量:', tasks.length);

        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="text-center text-gray-400 py-12">
                    <i class="fas fa-robot text-6xl mb-4 text-purple-400"></i>
                    <p class="text-xl">暂无任务</p>
                    <p class="text-sm mt-2">添加您的第一个任务开始管理</p>
                </div>
            `;
        } else {
            taskList.innerHTML = tasks.map(task => `
                <div class="glass glass-hover rounded-lg p-4 priority-medium slide-in" data-task-id="${task.id}">
                    <div class="flex items-start justify-between">
                        <div class="flex items-start space-x-4 flex-1">
                            <button onclick="toggleTask(${task.id})"
                                    class="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0">
                            </button>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-xl font-bold text-white mb-3">${task.title}</h3>
                                ${task.description ? `<p class="text-gray-300 mb-4">${task.description}</p>` : ''}
                                <div class="flex flex-wrap gap-2">
                                    <span class="category-${task.category} px-4 py-2 rounded-lg text-white text-sm font-medium">
                                        ${task.category}
                                    </span>
                                    <span class="priority-${task.priority} px-4 py-2 rounded-lg text-white text-sm font-medium">
                                        ${task.priority}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 ml-4 flex-shrink-0">
                            <button onclick="deleteTask(${task.id})"
                                    class="text-red-400 hover:text-red-300 transition-colors p-3 hover:bg-red-500 hover:bg-opacity-20 rounded-lg">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        updateStats();
        console.log('任务列表渲染完成');

    } catch (error) {
        console.error('渲染任务时出错:', error);
    }
}

function updateStats() {
    try {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        const totalElement = document.getElementById('totalTasks');
        const completedElement = document.getElementById('completedTasks');
        const pendingElement = document.getElementById('pendingTasks');

        if (totalElement) totalElement.textContent = total;
        if (completedElement) completedElement.textContent = completed;
        if (pendingElement) pendingElement.textContent = pending;

        console.log('统计数据更新:', { total, completed, pending });
    } catch (error) {
        console.error('更新统计时出错:', error);
    }
}

function toggleTask(id) {
    console.log('切换任务状态:', id);
    try {
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            console.log('任务状态已切换:', task.title, '完成状态:', task.completed);
        }
    } catch (error) {
        console.error('切换任务状态时出错:', error);
    }
}

function deleteTask(id) {
    console.log('删除任务:', id);
    try {
        if (confirm('确定要删除这个任务吗？')) {
            tasks = tasks.filter(t => t.id != id);
            saveTasks();
            renderTasks();
            console.log('任务已删除');
        }
    } catch (error) {
        console.error('删除任务时出错:', error);
    }
}

function updateCountdowns() {
    console.log('更新倒计时');
    // 简化版本，实际项目中可以保持原有的复杂逻辑
}

console.log('NEXUS TASK调试版本加载完成');