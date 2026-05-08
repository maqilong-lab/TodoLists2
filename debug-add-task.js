// 调试添加任务功能的脚本
console.log("=== 添加任务功能调试 ===");

// 1. 检查DOM元素是否存在
function checkElements() {
    console.log("\n1. 检查DOM元素:");
    const elements = ['taskTitle', 'taskDesc', 'taskDueDate', 'taskPriority', 'taskCategory'];

    elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`  ${id}: ${element ? '✓ 存在' : '✗ 不存在'}`);
    });
}

// 2. 检查函数是否定义
function checkFunctions() {
    console.log("\n2. 检查函数定义:");
    const functions = ['addTask', 'showError', 'showSuccess', 'saveTasks', 'renderTasks', 'updateStats'];

    functions.forEach(funcName => {
        const func = window[funcName];
        console.log(`  ${funcName}: ${typeof func === 'function' ? '✓ 已定义' : '✗ 未定义'}`);
    });
}

// 3. 检查事件绑定
function checkEventBinding() {
    console.log("\n3. 检查事件绑定:");
    const button = document.querySelector('button[onclick*="addTask"]');
    if (button) {
        console.log("  ✓ 找到添加任务按钮");
        console.log(`  按钮类型: ${button.type || '未设置（默认为submit）'}`);
        console.log(`  onclick: ${button.onclick ? '✓ 已绑定' : '✗ 未绑定'}`);
    } else {
        console.log("  ✗ 未找到添加任务按钮");
    }
}

// 4. 模拟添加任务
function simulateAddTask() {
    console.log("\n4. 模拟添加任务:");

    // 设置测试数据
    document.getElementById('taskTitle').value = '测试任务';
    document.getElementById('taskDesc').value = '这是一个测试任务';
    document.getElementById('taskDueDate').value = '2024-12-31T10:00';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskCategory').value = 'work';

    console.log("  ✓ 测试数据已设置");

    try {
        // 调用addTask函数
        addTask();
        console.log("  ✓ addTask函数调用成功");

        // 检查任务是否添加
        console.log(`  任务数量: ${tasks.length}`);
        console.log(`  任务列表:`, tasks);

    } catch (error) {
        console.log(`  ✗ addTask函数调用失败:`, error.message);
    }
}

// 运行调试
function runDebug() {
    console.log("开始调试添加任务功能...");

    setTimeout(() => {
        checkElements();
        checkFunctions();
        checkEventBinding();

        // 等待DOM完全加载后再模拟
        if (document.getElementById('taskTitle')) {
            simulateAddTask();
        } else {
            console.log("\n✗ DOM元素未准备好，请确保在页面加载完成后运行调试");
        }
    }, 1000);
}

// 导出调试函数
window.debugAddTask = runDebug;

console.log("调试脚本已加载，可以调用 window.debugAddTask() 开始调试");