-- Services
local Players = game:GetService("Players")
local CoreGui = game:GetService("CoreGui")
local HttpService = game:GetService("HttpService")

local player = Players.LocalPlayer

-- Vercel Proxy Sunucu Adresin
local PROXY_URL = "https://twitter-apii.vercel.app/get-tweets"

-- Ana Ekran
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "TwitterHubGui"
ScreenGui.Parent = CoreGui
ScreenGui.ResetOnSpawn = false

----------------------------------------------------------------
-- 1. PANEL: BAĞLANTI / GİRİŞ EKRANI
----------------------------------------------------------------
local ApiPanel = Instance.new("Frame")
ApiPanel.Size = UDim2.new(0, 400, 0, 220)
ApiPanel.Position = UDim2.new(0.5, -200, 0.5, -110)
ApiPanel.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
ApiPanel.BorderSizePixel = 0
ApiPanel.Parent = ScreenGui

local ApiCorner = Instance.new("UICorner")
ApiCorner.CornerRadius = UDim.new(0, 8)
ApiCorner.Parent = ApiPanel

local ApiTitle = Instance.new("TextLabel")
ApiTitle.Size = UDim2.new(1, 0, 0, 40)
ApiTitle.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
ApiTitle.Text = "Twitter Proxy Bağlantısı"
ApiTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
ApiTitle.TextSize = 16
ApiTitle.Font = Enum.Font.GothamBold
ApiTitle.Parent = ApiPanel

local ApiInput = Instance.new("TextBox")
ApiInput.Size = UDim2.new(0, 370, 0, 40)
ApiInput.Position = UDim2.new(0, 15, 0, 60)
ApiInput.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
ApiInput.TextColor3 = Color3.fromRGB(255, 255, 255)
ApiInput.PlaceholderText = "Sunucu şifresi veya boş bırak..."
ApiInput.Text = ""
ApiInput.TextSize = 13
ApiInput.Font = Enum.Font.Gotham
ApiInput.Parent = ApiPanel

local InputCorner = Instance.new("UICorner")
InputCorner.CornerRadius = UDim.new(0, 6)
InputCorner.Parent = ApiInput

-- Bağlan Butonu
local ApplyButton = Instance.new("TextButton")
ApplyButton.Size = UDim2.new(0, 175, 0, 35)
ApplyButton.Position = UDim2.new(0, 15, 0, 115)
ApplyButton.BackgroundColor3 = Color3.fromRGB(29, 155, 240) -- Twitter Mavisi
ApplyButton.TextColor3 = Color3.fromRGB(255, 255, 255)
ApplyButton.Text = "Bağlan"
ApplyButton.TextSize = 14
ApplyButton.Font = Enum.Font.GothamBold
ApplyButton.Parent = ApiPanel

local ApplyCorner = Instance.new("UICorner")
ApplyCorner.CornerRadius = UDim.new(0, 6)
ApplyCorner.Parent = ApplyButton

-- Bilgi Butonu
local HelpButton = Instance.new("TextButton")
HelpButton.Size = UDim2.new(0, 185, 0, 35)
HelpButton.Position = UDim2.new(0, 200, 0, 115)
HelpButton.BackgroundColor3 = Color3.fromRGB(50, 100, 200)
HelpButton.TextColor3 = Color3.fromRGB(255, 255, 255)
HelpButton.Text = "Nasıl Çalışır?"
HelpButton.TextSize = 14
HelpButton.Font = Enum.Font.GothamBold
HelpButton.Parent = ApiPanel

local HelpCorner = Instance.new("UICorner")
HelpCorner.CornerRadius = UDim.new(0, 6)
HelpCorner.Parent = HelpButton

-- Durum / Bilgi Yazısı
local StatusLabel = Instance.new("TextLabel")
StatusLabel.Size = UDim2.new(1, -30, 0, 30)
StatusLabel.Position = UDim2.new(0, 15, 0, 165)
StatusLabel.BackgroundTransparency = 1
StatusLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
StatusLabel.TextSize = 12
StatusLabel.Font = Enum.Font.Gotham
StatusLabel.Text = "Vercel proxy sunucusuna bağlanmak için tıkla."
StatusLabel.Parent = ApiPanel

----------------------------------------------------------------
-- 2. PANEL: TWITTER AKIŞ / ARAMA HUB (Başlangıçta Gizli)
----------------------------------------------------------------
local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 450, 0, 320)
MainFrame.Position = UDim2.new(0.5, -225, 0.5, -160)
MainFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
MainFrame.BorderSizePixel = 0
MainFrame.Visible = false
MainFrame.Parent = ScreenGui

local MainCorner = Instance.new("UICorner")
MainCorner.CornerRadius = UDim.new(0, 8)
MainCorner.Parent = MainFrame

local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 40)
Title.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
Title.Text = "Twitter (X) Gönderi Okuyucu"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 16
Title.Font = Enum.Font.GothamBold
Title.Parent = MainFrame

local SearchBox = Instance.new("TextBox")
SearchBox.Size = UDim2.new(0, 330, 0, 35)
SearchBox.Position = UDim2.new(0, 15, 0, 55)
SearchBox.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
SearchBox.TextColor3 = Color3.fromRGB(255, 255, 255)
SearchBox.PlaceholderText = "Aranacak kelime veya kullanıcı..."
SearchBox.Text = ""
SearchBox.TextSize = 14
SearchBox.Font = Enum.Font.Gotham
SearchBox.Parent = MainFrame

local SearchCorner = Instance.new("UICorner")
SearchCorner.CornerRadius = UDim.new(0, 6)
SearchCorner.Parent = SearchBox

local SearchButton = Instance.new("TextButton")
SearchButton.Size = UDim2.new(0, 75, 0, 35)
SearchButton.Position = UDim2.new(0, 355, 0, 55)
SearchButton.BackgroundColor3 = Color3.fromRGB(29, 155, 240)
SearchButton.TextColor3 = Color3.fromRGB(255, 255, 255)
SearchButton.Text = "Getir"
SearchButton.TextSize = 14
SearchButton.Font = Enum.Font.GothamBold
SearchButton.Parent = MainFrame

local BtnCorner = Instance.new("UICorner")
BtnCorner.CornerRadius = UDim.new(0, 6)
BtnCorner.Parent = SearchButton

local ResultsScroll = Instance.new("ScrollingFrame")
ResultsScroll.Size = UDim2.new(0, 420, 0, 200)
ResultsScroll.Position = UDim2.new(0, 15, 0, 105)
ResultsScroll.BackgroundTransparency = 1
ResultsScroll.CanvasSize = UDim2.new(0, 0, 0, 0)
ResultsScroll.ScrollBarThickness = 6
ResultsScroll.Parent = MainFrame

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
UIListLayout.Padding = UDim.new(0, 8)
UIListLayout.Parent = ResultsScroll

----------------------------------------------------------------
-- 3. PANEL: BİLGİLENDİRME EKRANI
----------------------------------------------------------------
local HelpPanel = Instance.new("Frame")
HelpPanel.Size = UDim2.new(0, 420, 0, 240)
HelpPanel.Position = UDim2.new(0.5, -210, 0.5, -120)
HelpPanel.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
HelpPanel.BorderSizePixel = 0
HelpPanel.Visible = false
HelpPanel.Parent = ScreenGui

local HelpPanelCorner = Instance.new("UICorner")
HelpPanelCorner.CornerRadius = UDim.new(0, 8)
HelpPanelCorner.Parent = HelpPanel

local HelpTitle = Instance.new("TextLabel")
HelpTitle.Size = UDim2.new(1, 0, 0, 40)
HelpTitle.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
HelpTitle.Text = "Sistem Nasıl Çalışıyor?"
HelpTitle.TextColor3 = Color3.fromRGB(255, 255, 255)
HelpTitle.TextSize = 15
HelpTitle.Font = Enum.Font.GothamBold
HelpTitle.Parent = HelpPanel

local HelpText = Instance.new("TextLabel")
HelpText.Size = UDim2.new(1, -30, 0, 130)
HelpText.Position = UDim2.new(0, 15, 0, 50)
HelpText.BackgroundTransparency = 1
HelpText.TextColor3 = Color3.fromRGB(230, 230, 230)
HelpText.TextSize = 13
HelpText.Font = Enum.Font.Gotham
HelpText.TextXAlignment = Enum.TextXAlignment.Left
HelpText.TextYAlignment = Enum.TextYAlignment.Top
HelpText.TextWrapped = true
HelpText.Text = "1. Roblox CORS engeli yüzünden doğrudan Twitter'a bağlanamaz.\n2. Bu script, istekleri senin Vercel sunucusuna (twitter-apii.vercel.app) gönderir.\n3. Vercel sunucun Twitter'dan verileri çekip roblox'a geri iletir."
HelpText.Parent = HelpPanel

local BackButton = Instance.new("TextButton")
BackButton.Size = UDim2.new(0, 120, 0, 30)
BackButton.Position = UDim2.new(0.5, -60, 1, -40)
BackButton.BackgroundColor3 = Color3.fromRGB(150, 50, 50)
BackButton.TextColor3 = Color3.fromRGB(255, 255, 255)
BackButton.Text = "Geri Dön"
BackButton.TextSize, BackButton.Font = 13, Enum.Font.GothamBold
BackButton.Parent = HelpPanel

local BackCorner = Instance.new("UICorner")
BackCorner.CornerRadius = UDim.new(0, 6)
BackCorner.Parent = BackButton

----------------------------------------------------------------
-- FONKSİYONLAR VE BUTON ETKİLEŞİMLERİ
----------------------------------------------------------------

HelpButton.MouseButton1Click:Connect(function()
	ApiPanel.Visible = false
	HelpPanel.Visible = true
end)

BackButton.MouseButton1Click:Connect(function()
	HelpPanel.Visible = false
	ApiPanel.Visible = true
end)

-- Bağlan Butonu
ApplyButton.MouseButton1Click:Connect(function()
	StatusLabel.TextColor3 = Color3.fromRGB(255, 200, 50)
	StatusLabel.Text = "Vercel sunucusu test ediliyor..."

	local success, response = pcall(function()
		local req = (syn and syn.request) or (http and http.request) or request
		return req({ Url = PROXY_URL, Method = "GET" })
	end)

	if success and response and response.StatusCode == 200 then
		ApiPanel.Visible = false
		MainFrame.Visible = true
	else
		StatusLabel.TextColor3 = Color3.fromRGB(255, 80, 80)
		StatusLabel.Text = "Sunucuya ulaşılamadı! Linki kontrol et."
	end
end)

-- Twitter Verilerini Çekme Fonksiyonu
local function fetchTweets(query)
	for _, child in ipairs(ResultsScroll:GetChildren()) do
		if child:IsA("Frame") then child:Destroy() end
	end

	local fullUrl = PROXY_URL .. "?q=" .. HttpService:UrlEncode(query)

	local success, response = pcall(function()
		local req = (syn and syn.request) or (http and http.request) or request
		return req({ Url = fullUrl, Method = "GET" })
	end)

	if success and response and response.StatusCode == 200 then
		local data = HttpService:JSONDecode(response.Body)
		local yOffset = 0
		
		-- Gelen verinin yapısına göre döngü (Vercel tarafındaki kodun çıktısına göre uyarlanabilir)
		local tweets = data.data or data -- Eğer standart Twitter v2 formatıysa data.data olur
		
		if type(tweets) == "table" then
			for _, item in ipairs(tweets) do
				local tweetText = item.text or "İçerik bulunamadı"

				local ItemFrame = Instance.new("Frame")
				ItemFrame.Size = UDim2.new(1, -10, 0, 60)
				ItemFrame.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
				ItemFrame.Parent = ResultsScroll

				local ItemCorner = Instance.new("UICorner")
				ItemCorner.CornerRadius = UDim.new(0, 6)
				ItemCorner.Parent = ItemFrame

				local TextLabel = Instance.new("TextLabel")
				TextLabel.Size = UDim2.new(1, -10, 1, -10)
				TextLabel.Position = UDim2.new(0, 5, 0, 5)
				TextLabel.BackgroundTransparency = 1
				TextLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
				TextLabel.TextSize = 12
				TextLabel.Font = Enum.Font.Gotham
				TextLabel.Text = tweetText
				TextLabel.TextXAlignment = Enum.TextXAlignment.Left
				TextLabel.TextYAlignment = Enum.TextYAlignment.Top
				TextLabel.TextWrapped = true
				TextLabel.Parent = ItemFrame

				yOffset = yOffset + 68
			end
		end
		ResultsScroll.CanvasSize = UDim2.new(0, 0, 0, yOffset)
	end
end

SearchButton.MouseButton1Click:Connect(function()
	fetchTweets(SearchBox.Text)
end)
