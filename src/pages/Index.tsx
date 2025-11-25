import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
            <h2 className="text-3xl font-bold">Добро пожаловать!</h2>
            <p className="text-muted-foreground">
              Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">Уровень энергии:</span>
              <Select value={currentEnergyLevel} onValueChange={(v: any) => setCurrentEnergyLevel(v)}>
                <SelectTrigger className="w-32 border-0 shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Высокий
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      Средний
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      Низкий
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">ВП</AvatarFallback>
            </Avatar>
          </div>
        </header>

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
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                      </Avatar>
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
                  <Progress value={skill.value} className="h-2" />
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
      </main>
    </div>
  );
};

export default Index;
