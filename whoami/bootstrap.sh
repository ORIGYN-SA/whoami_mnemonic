dfx start --background

dfx canister create --all

dfx build 

dfx canister install --all --mode=reinstall

echo Please access: http://localhost:8000/?canisterId=$(dfx canister id whoami_assets)
