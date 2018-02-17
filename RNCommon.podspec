require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNCommon"
  s.version      = package["version"]
  s.summary      = "UI & API Components Library for React Native"
  s.homepage     = "https://github.com/rghorbani/react-native-common"
  s.license      = "MIT"
  s.author       = { "Reza Ghorbani" => "r.ghorbani.f@gmail.com" }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/rghorbani/react-native-common.git", :tag => "master" }

  s.source_files  = "ios/**/*.{h,m}"

  s.dependency "React"
end
