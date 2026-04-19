import { Student } from '../App';
import { User, Camera, Edit2, Save, X, Image } from 'lucide-react';
import { useState, useRef } from 'react';

interface ProfileProps {
  student: Student;
  onUpdateProfile: (updates: Partial<Student>) => void;
}

export function Profile({ student, onUpdateProfile }: ProfileProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedName, setEditedName] = useState(student.name);
  const [editedBio, setEditedBio] = useState(student.bio || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onUpdateProfile({ profilePhoto: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 3MB for cover)
    if (file.size > 3 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 3MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onUpdateProfile({ coverPhoto: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    if (editedName.trim().length < 2) {
      alert('Nama harus minimal 2 karakter.');
      return;
    }
    onUpdateProfile({ name: editedName.trim() });
    setIsEditingName(false);
  };

  const handleSaveBio = () => {
    onUpdateProfile({ bio: editedBio.trim() });
    setIsEditingBio(false);
  };

  const handleCancelEditName = () => {
    setEditedName(student.name);
    setIsEditingName(false);
  };

  const handleCancelEditBio = () => {
    setEditedBio(student.bio || '');
    setIsEditingBio(false);
  };

  const handleRemovePhoto = () => {
    if (confirm('Hapus foto profil?')) {
      onUpdateProfile({ profilePhoto: undefined });
    }
  };

  const handleRemoveCover = () => {
    if (confirm('Hapus foto cover?')) {
      onUpdateProfile({ coverPhoto: undefined });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Profil Saya</h2>
        </div>
        <p className="text-gray-600">
          Kelola informasi profil dan preferensi Anda
        </p>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Foto Profil</h3>
        <div className="flex items-center gap-6">
          {/* Photo Display */}
          <div className="relative">
            {student.profilePhoto ? (
              <img
                src={student.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-blue-200">
                <span className="text-5xl font-bold text-blue-600">
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          {/* Photo Actions */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Upload Foto Profil</h4>
            <p className="text-sm text-gray-600 mb-3">
              Format: JPG, PNG, atau GIF. Maksimal 2MB.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Pilih Foto
              </button>
              {student.profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                >
                  Hapus Foto
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Photo Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Cover Photo Display */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-600 group">
          {student.coverPhoto ? (
            <img
              src={student.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <div className="text-center text-white/80">
                <Image className="w-16 h-16 mx-auto mb-2" />
                <p className="text-sm">Belum ada foto cover</p>
              </div>
            </div>
          )}
          
          {/* Upload Button Overlay */}
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 hover:bg-white rounded-lg flex items-center gap-2 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <Camera className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              {student.coverPhoto ? 'Ganti Cover' : 'Tambah Cover'}
            </span>
          </button>
          
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />
        </div>
        
        {/* Cover Actions */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-2">Foto Cover</h3>
          <p className="text-sm text-gray-600 mb-3">
            Foto cover akan ditampilkan di profil Anda. Format: JPG, PNG, atau GIF. Maksimal 3MB.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => coverInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {student.coverPhoto ? 'Ganti Cover' : 'Upload Cover'}
            </button>
            {student.coverPhoto && (
              <button
                onClick={handleRemoveCover}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Hapus Cover
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Name Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Nama / Username</h3>
          {!isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        {isEditingName ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Masukkan nama Anda"
              maxLength={50}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveName}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
              <button
                onClick={handleCancelEditName}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{student.name}</p>
          </div>
        )}
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Biografi / Tentang Saya</h3>
          {!isEditingBio && (
            <button
              onClick={() => setIsEditingBio(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        {isEditingBio ? (
          <div className="space-y-3">
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Ceritakan tentang diri Anda..."
              rows={5}
              maxLength={300}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {editedBio.length}/300 karakter
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveBio}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancelEditBio}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg min-h-[100px]">
            {student.bio ? (
              <p className="text-gray-700 whitespace-pre-wrap">{student.bio}</p>
            ) : (
              <p className="text-gray-400 italic">
                Belum ada biografi. Klik "Edit" untuk menambahkan.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Informasi Akun</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 mb-1">Bergabung Sejak</p>
            <p className="font-semibold text-green-900">
              {new Date(student.lastActive).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700 mb-1">Total Badge</p>
            <p className="font-semibold text-purple-900">{student.badges.length} badge</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700 mb-1">Level Diselesaikan</p>
            <p className="font-semibold text-amber-900">
              {student.completedLevels.length}/6 level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}