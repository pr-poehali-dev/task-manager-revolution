import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  energyLevel: 'high' | 'medium' | 'low';
  estimatedTime: number;
  assignee: string;
}

const Index = () => {
  const [currentEnergyLevel, setCurrentEnergyLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [selectedView, setSelectedView] = useState('dashboard');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Разработать API интеграцию',
      project: 'Backend MVP',
      priority: 'high',
      status: 'in-progress',
      energyLevel: 'high',
      estimatedTime: 180,
      assignee: 'АК',
    },
    {
      id: '2',
      title: 'Дизайн главной страницы',
      project: 'Редизайн',
      priority: 'medium',
      status: 'todo',
      energyLevel: 'high',
      estimatedTime: 120,
      assignee: 'МС',
    },
    {
      id: '3',
      title: 'Написать тесты для модуля авторизации',
      project: 'Backend MVP',
      priority: 'medium',
      status: 'todo',
      energyLevel: 'low',
      estimatedTime: 90,
      assignee: 'АК',
    },
    {
      id: '4',
      title: 'Обновить документацию',
      project: 'Документация',
      priority: 'low',
      status: 'todo',
      energyLevel: 'medium',
      estimatedTime: 60,
      assignee: 'ЕП',
    },
  ];

  const teamSkills = [
    { name: 'Frontend', value: 85 },
    { name: 'Backend', value: 92 },
    { name: 'Design', value: 78 },
    { name: 'Testing', value: 70 },
    { name: 'DevOps', value: 65 },
  ];

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const recommendedTasks = tasks
    .filter((task) => task.energyLevel === currentEnergyLevel)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-6 transition-transform duration-300">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Icon name="Zap" size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold">FlowTask</h1>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
            { id: 'tasks', icon: 'CheckSquare', label: 'Задачи' },
            { id: 'projects', icon: 'FolderKanban', label: 'Проекты' },
            { id: 'analytics', icon: 'BarChart3', label: 'Аналитика' },
            { id: 'calendar', icon: 'Calendar', label: 'Календарь' },
            { id: 'team', icon: 'Users', label: 'Команда' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedView(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                selectedView === item.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium">AI Focus Time</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Лучшее время для концентрации
          </p>
          <div className="font-mono text-2xl font-semibold text-primary">14:00-16:30</div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {selectedView === 'dashboard' && 'Добро пожаловать!'}
              {selectedView === 'tasks' && 'Задачи'}
              {selectedView === 'projects' && 'Проекты'}
              {selectedView === 'analytics' && 'Аналитика'}
              {selectedView === 'calendar' && 'Календарь'}
              {selectedView === 'team' && 'Команда'}
            </h2>
            <p className="text-muted-foreground">
              Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {selectedView === 'dashboard' && (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
                <span className="text-sm text-muted-foreground">Уровень энергии:</span>
                <select
                  value={currentEnergyLevel}
                  onChange={(e) => setCurrentEnergyLevel(e.target.value as any)}
                  className="rounded-md border-0 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="high">⚡ Высокий</option>
                  <option value="medium">☀️ Средний</option>
                  <option value="low">🌙 Низкий</option>
                </select>
              </div>
            )}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              ВП
            </div>
          </div>
        </header>

        {selectedView === 'dashboard' && (
          <>
            <div className="grid gap-6 md:grid-cols-4 mb-8">
          {[
            { label: 'Всего задач', value: '24', icon: 'CheckSquare', color: 'text-blue-600' },
            { label: 'В работе', value: '8', icon: 'Clock', color: 'text-orange-600' },
            { label: 'Завершено', value: '16', icon: 'CheckCircle2', color: 'text-green-600' },
            { label: 'Продуктивность', value: '87%', icon: 'TrendingUp', color: 'text-purple-600' },
          ].map((stat) => (
            <Card key={stat.label} className="p-6 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 font-mono text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-xl bg-muted p-3 ${stat.color}`}>
                  <Icon name={stat.icon} size={24} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold">Рекомендованные задачи</h3>
              </div>
              <Badge variant="outline" className="gap-1">
                <div className={`h-2 w-2 rounded-full ${getEnergyColor(currentEnergyLevel)}`} />
                {currentEnergyLevel === 'high' && 'Высокая энергия'}
                {currentEnergyLevel === 'medium' && 'Средняя энергия'}
                {currentEnergyLevel === 'low' && 'Низкая энергия'}
              </Badge>
            </div>

            <div className="space-y-3">
              {recommendedTasks.map((task) => (
                <div
                  key={task.id}
                  className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'high' && 'Высокий'}
                          {task.priority === 'medium' && 'Средний'}
                          {task.priority === 'low' && 'Низкий'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="FolderKanban" size={14} />
                          {task.project}
                        </span>
                        <span className="font-mono flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {task.estimatedTime} мин
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {task.assignee}
                      </div>
                      <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="Play" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-6 flex items-center gap-2">
              <Icon name="Radar" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold">Навыки команды</h3>
            </div>

            <div className="relative mb-6">
              <div className="aspect-square w-full">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {[0, 1, 2, 3, 4].map((level) => (
                    <polygon
                      key={level}
                      points={teamSkills
                        .map((_, i) => {
                          const angle = (i * 2 * Math.PI) / teamSkills.length - Math.PI / 2;
                          const radius = 80 * ((level + 1) / 5);
                          const x = 100 + radius * Math.cos(angle);
                          const y = 100 + radius * Math.sin(angle);
                          return `${x},${y}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                    />
                  ))}

                  {teamSkills.map((_, i) => {
                    const angle = (i * 2 * Math.PI) / teamSkills.length - Math.PI / 2;
                    const x1 = 100;
                    const y1 = 100;
                    const x2 = 100 + 80 * Math.cos(angle);
                    const y2 = 100 + 80 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                      />
                    );
                  })}

                  <polygon
                    points={teamSkills
                      .map((skill, i) => {
                        const angle = (i * 2 * Math.PI) / teamSkills.length - Math.PI / 2;
                        const radius = 80 * (skill.value / 100);
                        const x = 100 + radius * Math.cos(angle);
                        const y = 100 + radius * Math.sin(angle);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="url(#radarGradient)"
                    stroke="rgb(99, 102, 241)"
                    strokeWidth="2"
                  />

                  {teamSkills.map((skill, i) => {
                    const angle = (i * 2 * Math.PI) / teamSkills.length - Math.PI / 2;
                    const radius = 80 * (skill.value / 100);
                    const x = 100 + radius * Math.cos(angle);
                    const y = 100 + radius * Math.sin(angle);
                    return (
                      <circle key={i} cx={x} cy={y} r="4" fill="rgb(99, 102, 241)" />
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              {teamSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="font-mono font-semibold">{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Icon name="Network" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold">Карта зависимостей задач</h3>
          </div>

          <div className="relative h-64 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex h-full items-center justify-center gap-8">
              <div className="relative">
                <div className="absolute -left-24 top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm shadow-sm border border-border">
                    <Icon name="Circle" size={12} className="text-green-500" />
                    <span>API Design</span>
                  </div>
                </div>
                <svg className="absolute left-0 top-1/2 -translate-y-1/2" width="100" height="2">
                  <line x1="0" y1="1" x2="100" y2="1" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm shadow-lg text-primary-foreground border-2 border-primary">
                  <Icon name="Circle" size={12} className="text-primary-foreground animate-pulse" />
                  <span className="font-medium">API Integration</span>
                </div>
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <svg width="2" height="40">
                    <line x1="1" y1="0" x2="1" y2="40" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <svg className="absolute right-full top-1/2 -translate-y-1/2" width="100" height="2">
                  <line x1="0" y1="1" x2="100" y2="1" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <div className="absolute -right-24 top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm shadow-sm border border-border">
                    <Icon name="Circle" size={12} className="text-muted-foreground" />
                    <span>Testing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm shadow-sm border border-border">
                <Icon name="Circle" size={12} className="text-muted-foreground" />
                <span>Deployment</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <Icon name="AlertCircle" size={20} className="text-primary" />
              <div>
                <p className="font-medium">Критический путь определен</p>
                <p className="text-sm text-muted-foreground">
                  API Integration блокирует 2 задачи
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Eye" size={16} className="mr-2" />
              Подробнее
            </Button>
          </div>
        </Card>
          </>
        )}

        {selectedView === 'tasks' && (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' && 'Высокий'}
                        {task.priority === 'medium' && 'Средний'}
                        {task.priority === 'low' && 'Низкий'}
                      </Badge>
                      <Badge variant="outline">
                        {task.status === 'todo' && '📋 К выполнению'}
                        {task.status === 'in-progress' && '🔄 В работе'}
                        {task.status === 'done' && '✅ Готово'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="FolderKanban" size={14} />
                        {task.project}
                      </span>
                      <span className="font-mono flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {task.estimatedTime} мин
                      </span>
                      <span className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${getEnergyColor(task.energyLevel)}`} />
                        {task.energyLevel === 'high' && 'Высокая энергия'}
                        {task.energyLevel === 'medium' && 'Средняя энергия'}
                        {task.energyLevel === 'low' && 'Низкая энергия'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
                      {task.assignee}
                    </div>
                    <Button size="sm">
                      <Icon name="Play" size={16} className="mr-2" />
                      Начать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedView === 'projects' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {['Backend MVP', 'Редизайн', 'Документация'].map((project) => (
              <Card key={project} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon name="FolderKanban" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{project}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tasks.filter(t => t.project === project).length} задач
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-mono font-semibold">
                      {Math.round((tasks.filter(t => t.project === project && t.status === 'done').length / tasks.filter(t => t.project === project).length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ 
                        width: `${(tasks.filter(t => t.project === project && t.status === 'done').length / tasks.filter(t => t.project === project).length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Статистика продуктивности</h3>
              <div className="h-64 flex items-end justify-around gap-4">
                {[65, 80, 75, 90, 85, 95, 88].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${value}%` }}>
                      <div className="absolute inset-0 bg-primary rounded-t-lg" style={{ height: '100%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6">
                <Icon name="TrendingUp" size={24} className="text-green-600 mb-2" />
                <p className="text-sm text-muted-foreground">Средняя скорость</p>
                <p className="text-2xl font-bold mt-1">4.2 задачи/день</p>
              </Card>
              <Card className="p-6">
                <Icon name="Target" size={24} className="text-blue-600 mb-2" />
                <p className="text-sm text-muted-foreground">Точность оценок</p>
                <p className="text-2xl font-bold mt-1">87%</p>
              </Card>
              <Card className="p-6">
                <Icon name="Zap" size={24} className="text-purple-600 mb-2" />
                <p className="text-sm text-muted-foreground">Пиковые часы</p>
                <p className="text-2xl font-bold mt-1">14:00-16:00</p>
              </Card>
            </div>
          </div>
        )}

        {selectedView === 'calendar' && (
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ноябрь 2025</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all
                      ${i === 24 ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted'}
                      ${[0, 1, 8, 15].includes(i) ? 'bg-blue-50 border border-blue-200' : ''}
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">События сегодня</h4>
              {tasks.filter(t => t.status === 'in-progress').map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="flex-1">{task.title}</span>
                  <span className="text-sm text-muted-foreground font-mono">{task.estimatedTime} мин</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedView === 'team' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Члены команды</h3>
              <div className="space-y-4">
                {[
                  { name: 'Анна Коваленко', role: 'Backend Developer', tasks: 8, initials: 'АК' },
                  { name: 'Михаил Сидоров', role: 'UI/UX Designer', tasks: 5, initials: 'МС' },
                  { name: 'Елена Петрова', role: 'Technical Writer', tasks: 3, initials: 'ЕП' },
                ].map(member => (
                  <div key={member.initials} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{member.tasks}</p>
                      <p className="text-sm text-muted-foreground">активных задач</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Radar" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold">Навыки команды</h3>
              </div>
              <div className="space-y-4">
                {teamSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="font-mono font-semibold text-primary">{skill.value}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;