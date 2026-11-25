const STORAGE_KEY = "todo_app_tasks_v1";

function getTodayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getOffsetDateStr(offsetDays) {
  const dt = new Date();
  dt.setDate(dt.getDate() + offsetDays);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function createMockTasks() {
  const today = getTodayStr();
  return [
    {
      id: "mock-1",
      title: "Hoàn thiện giao diện TODO app và đẩy lên github",
      category: "Công việc",
      priority: "high",
      date: today,
      completed: false
    },
    {
      id: "mock-2",
      title: "Ôn tập kiến thức HTTP server trong node.js",
      category: "Học tập",
      priority: "high",
      date: today,
      completed: false
    },
    {
      id: "mock-3",
      title: "Nộp Báo cáo bài tập cá nhân lên lms",
      category: "Học tập",
      priority: "high",
      date: today,
      completed: false
    },
    {
      id: "mock-4",
      title: "Tự chấm điẻm",
      category: "Học tập",
      priority: "medium",
      date: today,
      completed: false
    },
    {
      id: "mock-5",
      title: "Tổng hợp ghi chú buổi học tuần trước",
      category: "Học tập",
      priority: "low",
      date: getOffsetDateStr(-1),
      completed: true
    }
  ];
}

const WEEKLY_MOCK_STATS = [
  { label: "T2", total: 5, done: 4 },
  { label: "T3", total: 6, done: 5 },
  { label: "T4", total: 4, done: 3 },
  { label: "T5", total: 7, done: 5 },
  { label: "T6", total: 5, done: 5 },
  { label: "T7", total: 3, done: 2 },
  { label: "CN", total: 4, done: 3 }
];

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = createMockTasks();
    saveTasks(initial);
    return initial;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const initial = createMockTasks();
    saveTasks(initial);
    return initial;
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function resetMockData() {
  const fresh = createMockTasks();
  saveTasks(fresh);
  location.reload();
}

const PRIORITY_LABEL = {
  high: "Cao",
  medium: "Trung bình",
  low: "Thấp"
};

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function initHomePage() {
  const today = getTodayStr();
  const todayLabel = document.getElementById("today-label");
  const form = document.getElementById("task-form");
  const formTitle = document.getElementById("form-title");
  const taskIdInput = document.getElementById("task-id");
  const titleInput = document.getElementById("task-title");
  const categoryInput = document.getElementById("task-category");
  const priorityInput = document.getElementById("task-priority");
  const dateInput = document.getElementById("task-date");
  const btnSubmit = document.getElementById("btn-submit");
  const btnCancelEdit = document.getElementById("btn-cancel-edit");

  const searchInput = document.getElementById("search-input");
  const filterStatus = document.getElementById("filter-status");
  const filterPriority = document.getElementById("filter-priority");
  const filterCategory = document.getElementById("filter-category");

  const taskListEl = document.getElementById("task-list");
  const taskCountEl = document.getElementById("task-count");
  const emptyStateEl = document.getElementById("empty-state");

  if (!form || !taskListEl) return;

  if (todayLabel) todayLabel.textContent = `Ngày hôm nay: ${today}`;
  if (dateInput) dateInput.value = today;

  let tasks = loadTasks();

  function exitEditMode() {
    if (taskIdInput) taskIdInput.value = "";
    if (titleInput) titleInput.value = "";
    if (categoryInput) categoryInput.value = "Học tập";
    if (priorityInput) priorityInput.value = "medium";
    if (dateInput) dateInput.value = today;
    if (formTitle) formTitle.textContent = "Thêm task mới";
    if (btnSubmit) btnSubmit.textContent = "Thêm task";
    if (btnCancelEdit) btnCancelEdit.classList.add("hidden");
  }

  function render() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const statusVal = filterStatus ? filterStatus.value : "all";
    const priorityVal = filterPriority ? filterPriority.value : "all";
    const categoryVal = filterCategory ? filterCategory.value : "all";

    const todayTasks = tasks.filter((t) => t.date === today);

    const filtered = todayTasks.filter((t) => {
      const matchSearch =
        !keyword ||
        String(t.title || "").toLowerCase().includes(keyword) ||
        String(t.category || "").toLowerCase().includes(keyword);

      const matchStatus =
        statusVal === "all" ||
        (statusVal === "completed" && Boolean(t.completed)) ||
        (statusVal === "pending" && !t.completed);

      const matchPriority = priorityVal === "all" || t.priority === priorityVal;
      const matchCategory = categoryVal === "all" || t.category === categoryVal;

      return matchSearch && matchStatus && matchPriority && matchCategory;
    });

    if (taskCountEl) taskCountEl.textContent = String(filtered.length);

    if (filtered.length === 0) {
      taskListEl.innerHTML = "";
      if (emptyStateEl) emptyStateEl.classList.remove("hidden");
      return;
    }

    if (emptyStateEl) emptyStateEl.classList.add("hidden");
    taskListEl.innerHTML = filtered
      .map(
        (t) => `
      <li class="task-item ${t.completed ? "completed" : ""}">
        <div class="task-left">
          <input type="checkbox" data-action="toggle" data-id="${escapeHtml(t.id)}" ${t.completed ? "checked" : ""} />
          <div>
            <div class="task-title">${escapeHtml(t.title)}</div>
            <div class="task-meta">
              <span class="badge">${escapeHtml(t.category)}</span>
              <span class="badge ${escapeHtml(t.priority)}">Ưu tiên: ${escapeHtml(PRIORITY_LABEL[t.priority] || t.priority)}</span>
              <span class="badge">${t.completed ? "Đã xong" : "Đang làm"}</span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button type="button" class="btn btn-outline btn-sm" data-action="edit" data-id="${escapeHtml(t.id)}">Sửa</button>
          <button type="button" class="btn btn-danger btn-sm" data-action="delete" data-id="${escapeHtml(t.id)}">Xóa</button>
        </div>
      </li>
    `
      )
      .join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput ? titleInput.value.trim() : "";
    if (!title) return;

    const editingId = taskIdInput ? taskIdInput.value : "";
    const chosenDate = dateInput && dateInput.value ? dateInput.value : today;
    const chosenCategory = categoryInput ? categoryInput.value : "Học tập";
    const chosenPriority = priorityInput ? priorityInput.value : "medium";

    if (editingId) {
      tasks = tasks.map((t) =>
        t.id === editingId
          ? {
              ...t,
              title,
              category: chosenCategory,
              priority: chosenPriority,
              date: chosenDate
            }
          : t
      );
      exitEditMode();
    } else {
      tasks.unshift({
        id: `task-${Date.now()}`,
        title,
        category: chosenCategory,
        priority: chosenPriority,
        date: chosenDate,
        completed: false
      });
      if (titleInput) {
        titleInput.value = "";
        titleInput.focus();
      }
    }

    saveTasks(tasks);
    render();
  });

  if (btnCancelEdit) {
    btnCancelEdit.addEventListener("click", exitEditMode);
  }

  taskListEl.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;

    const id = target.getAttribute("data-id");
    const action = target.getAttribute("data-action");

    if (action === "toggle") {
      tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      saveTasks(tasks);
      render();
    } else if (action === "edit") {
      const item = tasks.find((t) => t.id === id);
      if (!item) return;
      if (taskIdInput) taskIdInput.value = item.id;
      if (titleInput) titleInput.value = item.title;
      if (categoryInput) categoryInput.value = item.category;
      if (priorityInput) priorityInput.value = item.priority;
      if (dateInput) dateInput.value = item.date;
      if (formTitle) formTitle.textContent = "Chỉnh sửa task";
      if (btnSubmit) btnSubmit.textContent = "Lưu thay đổi";
      if (btnCancelEdit) btnCancelEdit.classList.remove("hidden");
      if (titleInput) titleInput.focus();
    } else if (action === "delete") {
      tasks = tasks.filter((t) => t.id !== id);
      if (taskIdInput && taskIdInput.value === id) exitEditMode();
      saveTasks(tasks);
      render();
    }
  });

  [searchInput, filterStatus, filterPriority, filterCategory].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  render();
}

function initStatsPage() {
  const today = getTodayStr();
  const tasks = loadTasks();
  const todayTasks = tasks.filter((t) => t.date === today);
  const todayDone = todayTasks.filter((t) => t.completed).length;
  const rate = todayTasks.length ? Math.round((todayDone / todayTasks.length) * 100) : 0;

  const elTotal = document.getElementById("kpi-today-total");
  const elDone = document.getElementById("kpi-today-done");
  const elRate = document.getElementById("kpi-rate");
  const elAllTotal = document.getElementById("kpi-all-total");

  if (elTotal) elTotal.textContent = String(todayTasks.length);
  if (elDone) elDone.textContent = String(todayDone);
  if (elRate) elRate.textContent = `${rate}%`;
  if (elAllTotal) elAllTotal.textContent = String(tasks.length);

  const chartEl = document.getElementById("weekly-chart");
  if (chartEl) {
    const maxVal = Math.max(...WEEKLY_MOCK_STATS.map((d) => d.total), 1);
    chartEl.innerHTML = WEEKLY_MOCK_STATS.map((d) => {
      const heightPct = Math.round((d.done / maxVal) * 100);
      return `
        <div class="bar-col">
          <span class="bar-label">${d.done}/${d.total}</span>
          <div class="bar-fill" style="height: ${Math.max(heightPct, 8)}%;"></div>
          <span class="bar-label">${escapeHtml(d.label)}</span>
        </div>
      `;
    }).join("");
  }

  const catEl = document.getElementById("category-breakdown");
  if (catEl) {
    const categories = ["Học tập", "Công việc", "Cá nhân"];
    const totalCount = Math.max(tasks.length, 1);

    catEl.innerHTML = categories
      .map((cat) => {
        const count = tasks.filter((t) => t.category === cat).length;
        const pct = Math.round((count / totalCount) * 100);
        return `
          <div>
            <div class="cat-row-head">
              <span><strong>${escapeHtml(cat)}</strong></span>
              <span>${count} task (${pct}%)</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnReset = document.getElementById("btn-reset-mock");
  if (btnReset) {
    btnReset.addEventListener("click", resetMockData);
  }

  const page = document.body.getAttribute("data-page");
  if (page === "home") initHomePage();
  if (page === "stats") initStatsPage();
});