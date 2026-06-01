// NEXUS TASK 3.0 - 智能任务管理系统
// 任务数据
let tasks = [];
let currentFilter = 'all';
let searchTerm = '';
let deleteTaskId = null;

// 友好的提示系统
function showNotification(message, type = 'info') {
    // 移除已存在的提示
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建提示元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // 根据类型设置图标
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    notification.innerHTML = `<i class="fas ${icons[type] || icons.info} mr-2"></i>${message}`;

    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(420px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 简化的提示函数
function showSuccess(message) { showNotification(message, 'success'); }
function showError(message) { showNotification(message, 'error'); }
function showWarning(message) { showNotification(message, 'warning'); }
function showInfo(message) { showNotification(message, 'info'); }

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateStats();
    renderTasks();
    updateCountdowns();
    setInterval(updateCountdowns, 60000); // 每分钟更新倒计时
});

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
    const titleElement = document.getElementById('taskTitle');
    const title = titleElement.value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;
    const category = document.getElementById('taskCategory').value;

    // 表单验证
    if (!title) {
        showError('请输入任务标题');
        titleElement.focus();
        titleElement.classList.add('ring-2', 'ring-red-400');
        setTimeout(() => titleElement.classList.remove('ring-2', 'ring-red-400'), 2000);
        return;
    }

    if (title.length > 100) {
        showError('任务标题不能超过100个字符');
        titleElement.focus();
        return;
    }

    if (description.length > 500) {
        showError('任务描述不能超过500个字符');
        document.getElementById('taskDesc').focus();
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

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    updateStats();

    // 清空输入框
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskDueDate').value = '';

    // 重置表单样式
    document.getElementById('taskDueDate').classList.remove('has-value');

    // 显示成功提示
    showSuccess('任务添加成功！');
}

// 切换任务完成状态
function toggleTask(id) {
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();

        // 添加完成动画
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement && task.completed) {
            taskElement.classList.add('task-complete');
            setTimeout(() => {
                taskElement.classList.remove('task-complete');
            }, 800);

            // 添加粒子效果
            createCompletionParticles(taskElement);
        }
    }
}

// 创建完成粒子效果
function createCompletionParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #6b9e78, #7cad85);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(particle);

        // 设置随机方向
        const angle = (i * 45) * Math.PI / 180;
        const distance = 50 + Math.random() * 30;
        const deltaX = Math.cos(angle) * distance;
        const deltaY = Math.sin(angle) * distance;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// 删除任务
function deleteTask(id) {
    deleteTaskId = id;
    document.getElementById('confirmModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('confirmModal').classList.add('hidden');
    deleteTaskId = null;
}

function confirmDelete() {
    if (deleteTaskId) {
        tasks = tasks.filter(t => t.id != deleteTaskId);
        saveTasks();
        renderTasks();
        updateStats();
        closeModal();
    }
}

// 清空已完成任务
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
        showWarning('没有已完成的任务');
        return;
    }
    document.getElementById('clearModal').classList.remove('hidden');
}

function closeClearModal() {
    document.getElementById('clearModal').classList.add('hidden');
}

function confirmClear() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    updateStats();
    closeClearModal();
}

// 筛选任务
function filterTasks(filter) {
    currentFilter = filter;

    // 更新按钮状态 - 重置所有按钮为凸起状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.boxShadow = '';
    });

    // 激活当前按钮 - 按下状态（inset shadow）
    const activeBtn = document.querySelector(`[onclick="filterTasks('${filter}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    renderTasks();
}

// 搜索任务
document.getElementById('searchInput').addEventListener('input', function() {
    searchTerm = this.value.toLowerCase();
    renderTasks();
});

// 日期时间选择器值变化监听
document.getElementById('taskDueDate').addEventListener('change', function() {
    if (this.value) {
        this.classList.add('has-value');
        document.getElementById('quickTimeButtons').classList.add('hidden');
    } else {
        this.classList.remove('has-value');
    }
});

// 显示快速时间选择按钮
document.getElementById('taskDueDate').addEventListener('focus', function() {
    document.getElementById('quickTimeButtons').classList.remove('hidden');
});

// 隐藏快速时间选择按钮
document.getElementById('taskDueDate').addEventListener('blur', function() {
    setTimeout(() => {
        document.getElementById('quickTimeButtons').classList.add('hidden');
    }, 200);
});

// 设置默认日期时间为明天此时
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(9, 0, 0, 0); // 设置为明天上午9点
const formattedDate = tomorrow.toISOString().slice(0, 16);
document.getElementById('taskDueDate').value = formattedDate;

// 渲染任务列表
function renderTasks() {
    const taskList = document.getElementById('taskList');
    let filteredTasks = tasks;

    // 应用筛选
    switch (currentFilter) {
        case 'pending':
            filteredTasks = tasks.filter(t => !t.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(t => t.completed);
            break;
        case 'high':
            filteredTasks = tasks.filter(t => t.priority === 'high');
            break;
        case 'overdue':
            filteredTasks = tasks.filter(t => isOverdue(t));
            break;
    }

    // 应用搜索
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(t =>
            t.title.toLowerCase().includes(searchTerm) ||
            t.description.toLowerCase().includes(searchTerm)
        );
    }

    // 渲染任务
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="text-center text-gray-400 py-12">
                <i class="fas fa-clipboard-list text-6xl mb-4 text-neo-purple opacity-50"></i>
                <p class="text-xl">${searchTerm ? '未找到匹配的任务' : '暂无任务'}</p>
                <p class="text-sm mt-2">${searchTerm ? '尝试其他搜索词' : '添加您的第一个任务开始管理'}</p>
            </div>
        `;
    } else {
        taskList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
    }

    // 更新任务计数
    document.getElementById('taskCount').textContent = filteredTasks.length;

    // 初始化拖拽排序
    initDragAndDrop();
}

// 创建任务HTML
function createTaskHTML(task) {
    const isOverdueTask = isOverdue(task);
    const countdown = getCountdown(task.dueDate);

    return `
        <div class="neumorph-task rounded-2xl p-4 md:p-6 ${task.completed ? 'opacity-60' : ''} slide-in" data-task-id="${task.id}">
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3 md:space-x-4 flex-1">
                    <button onclick="toggleTask(${task.id})"
                            class="neo-checkbox w-6 h-6 md:w-8 md:h-8 mt-0.5 md:mt-1 flex-shrink-0 ${task.completed ? 'checked' : ''}">
                        ${task.completed ? '<i class="fas fa-check text-white text-xs md:text-sm"></i>' : ''}
                    </button>

                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg md:text-xl font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'} mb-2 md:mb-3 break-words">
                            ${task.title}
                        </h3>
                        ${task.description ? `<p class="text-gray-500 text-sm md:text-base mb-3 md:mb-4 leading-relaxed break-words">${task.description}</p>` : ''}

                        <div class="grid grid-cols-1 gap-3 md:gap-4">
                            <!-- 分类和优先级 -->
                            <div class="space-y-2">
                                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">分类 & 优先级</div>
                                <div class="flex flex-wrap gap-2">
                                    <span class="category-${task.category} px-3 py-1 md:px-4 md:py-2 rounded-lg text-white text-xs md:text-sm font-medium uppercase tracking-wider inline-flex items-center">
                                        <i class="fas ${getCategoryIcon(task.category)} mr-1 md:mr-2"></i>${getCategoryName(task.category)}
                                    </span>
                                    <span class="priority-${task.priority} px-3 py-1 md:px-4 md:py-2 rounded-lg text-white text-xs md:text-sm font-medium uppercase tracking-wider inline-flex items-center">
                                        <i class="fas ${getPriorityIcon(task.priority)} mr-1 md:mr-2"></i>${getPriorityName(task.priority)}
                                    </span>
                                </div>
                            </div>

                            <!-- 时间信息 -->
                            <div class="space-y-2">
                                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">时间信息</div>

                                <!-- 创建时间 -->
                                <div class="flex items-center text-gray-500 text-xs md:text-sm neumorph-inset rounded-lg p-2 md:p-3">
                                    <i class="fas fa-plus-circle mr-2 md:mr-3 text-neo-green text-sm md:text-lg flex-shrink-0"></i>
                                    <div class="flex-1 min-w-0">
                                        <div class="text-xs text-gray-400 mb-0.5">创建时间</div>
                                        <div class="font-medium truncate text-gray-600">${formatDateTime(task.createdAt)}</div>
                                    </div>
                                </div>

                                <!-- 截止时间 -->
                                ${task.dueDate ? `
                                    <div class="flex items-center text-xs md:text-sm neumorph-inset rounded-lg p-2 md:p-3">
                                        <i class="fas fa-hourglass-end mr-2 md:mr-3 ${isOverdueTask ? 'text-neo-red' : 'text-neo-blue'} text-sm md:text-lg flex-shrink-0"></i>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-xs text-gray-400 mb-0.5">截止时间</div>
                                            <div class="font-medium ${isOverdueTask ? 'text-neo-red' : 'text-neo-blue'} truncate">${formatDateTime(task.dueDate)}</div>
                                        </div>
                                    </div>

                                    <!-- 倒计时 -->
                                    <div class="flex items-center text-xs md:text-sm neumorph-inset rounded-lg p-2 md:p-3">
                                        <i class="fas fa-stopwatch mr-2 md:mr-3 ${getCountdownIconStyle(task.dueDate, isOverdueTask)} text-sm md:text-lg flex-shrink-0"></i>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-xs text-gray-400 mb-0.5">剩余时间</div>
                                            <div class="font-mono font-bold ${getCountdownTextStyle(task.dueDate, isOverdueTask)} countdown-display truncate">
                                                ${countdown}
                                            </div>
                                        </div>
                                    </div>
                                ` : '<div class="text-gray-400 text-xs md:text-sm neumorph-inset rounded-lg p-2 md:p-3 text-center">无截止日期</div>'}
                            </div>

                            <!-- 状态指示器 -->
                            <div class="space-y-2">
                                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">状态</div>
                                <div class="flex flex-wrap gap-2">
                                    ${task.completed ? `
                                                <div class="flex items-center text-neo-green text-xs md:text-sm bg-neo-green bg-opacity-15 rounded-lg px-3 py-1 md:px-4 md:py-2 border border-neo-green border-opacity-30">
                                                    <i class="fas fa-check-circle mr-1 md:mr-2"></i>
                                                    <span class="font-medium">已完成</span>
                                                </div>
                                            ` : `
                                                <div class="flex items-center text-neo-orange text-xs md:text-sm bg-neo-orange bg-opacity-15 rounded-lg px-3 py-1 md:px-4 md:py-2 border border-neo-orange border-opacity-30">
                                                    <i class="fas fa-clock mr-1 md:mr-2"></i>
                                                    <span class="font-medium">进行中</span>
                                                </div>
                                            `}

                                    ${isOverdueTask && !task.completed ? `
                                                <div class="flex items-center text-neo-red text-xs md:text-sm bg-neo-red bg-opacity-15 rounded-lg px-3 py-1 md:px-4 md:py-2 border border-neo-red border-opacity-30 font-bold">
                                                    <i class="fas fa-exclamation-triangle mr-1 md:mr-2"></i>
                                                    <span class="font-medium">已逾期</span>
                                                </div>
                                            ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center space-x-1 md:space-x-2 ml-2 md:ml-4 flex-shrink-0">
                    <button onclick="showEditModal(${task.id})"
                            class="neo-icon-btn text-neo-blue p-2 md:p-3">
                        <i class="fas fa-edit text-sm md:text-base"></i>
                    </button>
                    <button onclick="deleteTask(${task.id})"
                            class="neo-icon-btn text-neo-red p-2 md:p-3">
                        <i class="fas fa-trash-alt text-sm md:text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        work: '工作',
        study: '学习',
        life: '生活',
        personal: '个人',
        other: '其他'
    };
    return names[category] || category;
}

// 获取分类图标
function getCategoryIcon(category) {
    const icons = {
        work: 'fa-briefcase',
        study: 'fa-graduation-cap',
        life: 'fa-home',
        personal: 'fa-user',
        other: 'fa-folder'
    };
    return icons[category] || 'fa-folder';
}

// 获取优先级名称
function getPriorityName(priority) {
    const names = {
        high: '高优先级',
        medium: '中优先级',
        low: '低优先级'
    };
    return names[priority] || priority;
}

// 获取优先级图标
function getPriorityIcon(priority) {
    const icons = {
        high: 'fa-arrow-up',
        medium: 'fa-minus',
        low: 'fa-arrow-down'
    };
    return icons[priority] || 'fa-minus';
}

// 判断是否逾期
function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
}

// 格式化日期时间
function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const now = new Date();
    const diff = now - date;

    // 如果是今天，显示时间
    if (date.toDateString() === now.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `今天 ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    // 如果是昨天
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `昨天 ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    // 其他日期 - 显示完整日期时间
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// 获取精确倒计时（到分钟）
function getCountdown(dueDate) {
    if (!dueDate) return '';

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff < 0) {
        const overdue = Math.abs(diff);
        const days = Math.floor(overdue / (1000 * 60 * 60 * 24));
        const hours = Math.floor((overdue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((overdue % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
            return `已逾期 ${days}天 ${hours}小时 ${minutes}分钟`;
        } else if (hours > 0) {
            return `已逾期 ${hours}小时 ${minutes}分钟`;
        } else {
            return `已逾期 ${minutes}分钟`;
        }
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
            return `还剩 ${days}天 ${hours}小时 ${minutes}分钟`;
        } else if (hours > 0) {
            return `还剩 ${hours}小时 ${minutes}分钟`;
        } else if (minutes > 0) {
            return `还剩 ${minutes}分钟`;
        } else {
            return `即将到期`;
        }
    }
}

// 获取倒计时图标样式
function getCountdownIconStyle(dueDate, isOverdue) {
    if (isOverdue) {
        return 'text-neo-red';
    }

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours <= 1) {
        return 'text-neo-red';
    } else if (hours <= 24) {
        return 'text-neo-orange';
    } else {
        return 'text-neo-blue';
    }
}

// 获取倒计时文本样式
function getCountdownTextStyle(dueDate, isOverdue) {
    if (isOverdue) {
        return 'text-neo-red font-bold';
    }

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours <= 1) {
        return 'text-neo-red font-bold';
    } else if (hours <= 24) {
        return 'text-neo-orange font-semibold';
    } else {
        return 'text-neo-blue';
    }
}

// 更新倒计时显示
function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown-display');
    countdownElements.forEach(el => {
        const taskElement = el.closest('[data-task-id]');
        if (taskElement) {
            const taskId = parseInt(taskElement.getAttribute('data-task-id'));
            const task = tasks.find(t => t.id === taskId);
            if (task && task.dueDate) {
                const countdown = getCountdown(task.dueDate);
                const isOverdueTask = isOverdue(task);

                el.textContent = countdown;
                // 保留基础类名，只更新文本样式类
                const baseClasses = el.className
                    .replace(/text-neo-(blue|red|orange)\s*/g, '')
                    .replace(/font-(bold|semibold)\s*/g, '')
                    .trim();
                el.className = `${baseClasses} ${getCountdownTextStyle(task.dueDate, isOverdueTask)} countdown-display`;

                // 更新图标
                const icon = el.parentElement.querySelector('i');
                if (icon) {
                    icon.className = `fas fa-stopwatch mr-2 ${getCountdownIconStyle(task.dueDate, isOverdueTask)}`;
                }
            }
        }
    });
}

// 初始化拖拽排序
function initDragAndDrop() {
    const taskList = document.getElementById('taskList');
    if (taskList.children.length > 1) {
        new Sortable(taskList, {
            animation: 150,
            handle: '.neumorph-task',
            onEnd: function() {
                // 重新排序tasks数组
                const taskElements = taskList.children;
                const newTasks = [];
                for (let i = 0; i < taskElements.length; i++) {
                    const taskId = parseInt(taskElements[i].getAttribute('data-task-id'));
                    const task = tasks.find(t => t.id === taskId);
                    if (task) newTasks.push(task);
                }
                tasks = newTasks;
                saveTasks();
            }
        });
    }
}

// 更新统计数据
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => isOverdue(t)).length;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('overdueTasks').textContent = overdue;
}

// 保存任务到localStorage
function saveTasks() {
    localStorage.setItem('nexusTasks', JSON.stringify(tasks));
}

// 从localStorage加载任务
function loadTasks() {
    const saved = localStorage.getItem('nexusTasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

// 快速设置时间
function setQuickTime(hours) {
    const now = new Date();
    const targetTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const formattedDate = targetTime.toISOString().slice(0, 16);
    document.getElementById('taskDueDate').value = formattedDate;
    document.getElementById('taskDueDate').classList.add('has-value');
    document.getElementById('quickTimeButtons').classList.add('hidden');
}

// 编辑任务相关功能
function showEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDesc').value = task.description || '';
    document.getElementById('editTaskDueDate').value = task.dueDate || '';
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editTaskCategory').value = task.category;

    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editTaskTitle').focus();
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    document.getElementById('editForm').reset();
}

function saveEditTask(e) {
    e.preventDefault();

    const taskId = parseInt(document.getElementById('editTaskId').value);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        closeEditModal();
        return;
    }

    const title = document.getElementById('editTaskTitle').value.trim();
    if (!title) {
        showError('请输入任务标题');
        document.getElementById('taskTitle').focus();
        return;
    }

    task.title = title;
    task.description = document.getElementById('editTaskDesc').value.trim();
    task.dueDate = document.getElementById('editTaskDueDate').value;
    task.priority = document.getElementById('editTaskPriority').value;
    task.category = document.getElementById('editTaskCategory').value;

    saveTasks();
    renderTasks();
    updateStats();

    closeEditModal();
}

// 设置编辑表单提交事件
document.getElementById('editForm').addEventListener('submit', saveEditTask);

// 添加Esc键关闭编辑模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEditModal();
    }
});
