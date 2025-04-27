import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, BookOpen, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { progressUserController } from "../../controller/progress-controller"; // adjust path

interface LearningProgress {
  completedLessons: number;
  totalLessons: number;
  completedExercises: number;
  totalExercises: number;
  currentLevel: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  avatarUrl?: string;
  username: string;
}

const LearningProgressCard = () => {
  const [progressData, setProgressData] = useState<LearningProgress>({
    completedLessons: 0,
    totalLessons: 20,
    completedExercises: 0,
    totalExercises: 10,
    currentLevel: 1,
    xp: 0,
    xpToNextLevel: 0,
    streakDays: 0,
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { handleProgress } = progressUserController();

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const data = await handleProgress();
        
        if (data) {
          console.log("Received progress data:", data);
          setProgressData({
            completedLessons: data.lessonCompleted || 0,
            totalLessons: 10,
            completedExercises: data.exerciseCompleted || 0,
            totalExercises: 10,
            currentLevel: data.currentLevel || 1,
            xp: data.xp || 0,
            xpToNextLevel: data.xpToNextLevel || 0,
            streakDays: data.streakDays || 0,
            username: data.username || "user",
            avatarUrl: data.avatarUrl || "https://i.pravatar.cc/150",
          });
        }
      } catch (err) {
        console.error("Error loading progress:", err);
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const calculatePercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <p>Loading your progress...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center text-red-500">
              <p>{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={progressData.avatarUrl} />
                  <AvatarFallback>{progressData.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">My Progress</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Level {progressData.currentLevel} • {progressData.xp} XP
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
                <Award className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  Streak: {progressData.streakDays} days
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Lessons Progress */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Completed Lessons</h3>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {progressData.completedLessons}/{progressData.totalLessons}
                </span>
                <span className="font-bold text-primary">
                  {calculatePercentage(progressData.completedLessons, progressData.totalLessons)}%
                </span>
              </div>
              <Progress
                value={calculatePercentage(progressData.completedLessons, progressData.totalLessons)}
                className="h-3"
              />
            </div>

            {/* Exercises Progress */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Completed Exercises</h3>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {progressData.completedExercises}/{progressData.totalExercises}
                </span>
                <span className="font-bold text-primary">
                  {calculatePercentage(progressData.completedExercises, progressData.totalExercises)}%
                </span>
              </div>
              <Progress
                value={calculatePercentage(progressData.completedExercises, progressData.totalExercises)}
                className="h-3"
              />
            </div>

            {/* Level Progress */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Award className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium">Next Level Progress</h3>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {progressData.xp}/{progressData.xp + progressData.xpToNextLevel} XP
                </span>
                <span className="font-bold text-primary">
                  Level {progressData.currentLevel} → {progressData.currentLevel + 1}
                </span>
              </div>
              <Progress
                value={(progressData.xp / (progressData.xp + progressData.xpToNextLevel)) * 100}
                className="h-3"
              />
            </div>

            {/* Achievements */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {progressData.completedLessons >= 5 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" /> 5+ Lessons
                  </span>
                )}
                {progressData.completedExercises >= 10 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> 10+ Exercises
                  </span>
                )}
                {progressData.streakDays >= 7 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    🔥 7 Day Streak
                  </span>
                )}
                {progressData.currentLevel >= 3 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    ⭐ Level {progressData.currentLevel}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningProgressCard;