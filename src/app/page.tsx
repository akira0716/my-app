import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/login/actions'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MyApp
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm hidden sm:block">
                {user?.email}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm border border-white/20 text-gray-300 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  ログアウト
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">ようこそ！</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-purple-400 text-sm font-medium mb-1">ステータス</div>
              <div className="text-white font-semibold">アクティブ ✅</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-purple-400 text-sm font-medium mb-1">認証プロバイダ</div>
              <div className="text-white font-semibold capitalize">
                {user?.app_metadata?.provider || 'email'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-purple-400 text-sm font-medium mb-1">最終ログイン</div>
              <div className="text-white font-semibold text-sm">
                {user?.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString('ja-JP')
                  : '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Protected Content */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🔒 プロテクトページ
          </h3>
          <p className="text-gray-300 leading-relaxed">
            このページはログインしたユーザーのみがアクセスできます。
            未認証ユーザーがアクセスしようとすると、自動的にログインページへリダイレクトされます。
          </p>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <p className="text-purple-300 text-sm">
              💡 このプロジェクトは Next.js (App Router) + Supabase Auth で構築されています。
              Google OAuthおよびEmail/Password認証に対応しています。
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
